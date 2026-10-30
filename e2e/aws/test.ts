import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkHttpCases } from '../cases';
import { type Check, poll, runChecks, waitForHealth } from '../lib/smoke';
import { run as exec } from '../lib/shell';
import type { RunState } from '../lib/types';
import { readEventResult } from './logs';

const EVENT_TIMEOUT_MS = 150_000;

export async function test(state: RunState): Promise<boolean> {
  let ok = true;

  const endpoints: Array<[string, string]> = [
    ['httpApi', state.endpoints.httpApi],
    ['restApi', state.endpoints.restApi],
    ['functionUrl', state.endpoints.functionUrl],
    ['alb', state.endpoints.alb],
  ];

  for (const [name, baseUrl] of endpoints) {
    if (!baseUrl) continue;

    const timeout = name === 'alb' ? 180_000 : 60_000;
    const ready = await waitForHealth(name, baseUrl, timeout);

    if (!ready) {
      ok = false;
      continue;
    }

    ok = (await checkHttpCases(`http: ${name}`, baseUrl, 'aws')) && ok;
  }

  const since = Date.now() - 60_000;
  ok = (await runChecks('events: aws', buildEventChecks(state, since))) && ok;

  return ok;
}

function buildEventChecks(state: RunState, since: number): Check[] {
  const region = state.region;
  const logGroup = state.resources.logGroup;
  const marker = (source: string): string => `${state.runId}-${source}`;
  const read = (source: string): Promise<string | undefined> =>
    readEventResult(logGroup, source, region, since);

  return [
    {
      name: 'sqs event reaches the adapter',
      async run() {
        const body = marker('sqs');

        exec(
          'aws',
          [
            'sqs',
            'send-message',
            '--queue-url',
            state.resources.queueUrl,
            '--message-body',
            body,
            '--region',
            region,
          ],
          { inherit: true },
        );

        const payload = await poll(
          'sqs log line',
          () => read('sqs'),
          EVENT_TIMEOUT_MS,
        );
        const event = JSON.parse(payload);

        assert.equal(event.Records[0].eventSource, 'aws:sqs');
        assert.equal(event.Records[0].body, body);
      },
    },
    {
      name: 'sns event reaches the adapter',
      async run() {
        const body = marker('sns');

        exec(
          'aws',
          [
            'sns',
            'publish',
            '--topic-arn',
            state.resources.topicArn,
            '--message',
            body,
            '--region',
            region,
          ],
          { inherit: true },
        );

        const payload = await poll(
          'sns log line',
          () => read('sns'),
          EVENT_TIMEOUT_MS,
        );
        const event = JSON.parse(payload);

        assert.equal(event.Records[0].EventSource, 'aws:sns');
        assert.equal(event.Records[0].Sns.Message, body);
      },
    },
    {
      name: 's3 event reaches the adapter',
      async run() {
        const body = marker('s3');
        const key = `events/${body}.json`;
        const directory = mkdtempSync(join(tmpdir(), 'sae2e-'));
        const file = join(directory, `${body}.json`);

        writeFileSync(file, JSON.stringify({ marker: body }));

        exec(
          'aws',
          [
            's3',
            'cp',
            file,
            `s3://${state.resources.bucketName}/${key}`,
            '--region',
            region,
          ],
          { inherit: true },
        );

        const payload = await poll(
          's3 log line',
          () => read('s3'),
          EVENT_TIMEOUT_MS,
        );
        const event = JSON.parse(payload);

        assert.equal(event.Records[0].eventSource, 'aws:s3');
        assert.equal(event.Records[0].s3.object.key, key);
      },
    },
    {
      name: 'dynamodb stream event reaches the adapter',
      async run() {
        const body = marker('dynamodb');

        exec(
          'aws',
          [
            'dynamodb',
            'put-item',
            '--table-name',
            state.resources.tableName,
            '--item',
            JSON.stringify({ pk: { S: body } }),
            '--region',
            region,
          ],
          { inherit: true },
        );

        const payload = await poll(
          'dynamodb log line',
          () => read('dynamodb'),
          EVENT_TIMEOUT_MS,
        );
        const event = JSON.parse(payload);

        assert.equal(event.Records[0].eventSource, 'aws:dynamodb');
        assert.equal(event.Records[0].dynamodb.Keys.pk.S, body);
      },
    },
    {
      name: 'eventbridge event reaches the adapter',
      async run() {
        const body = marker('eventbridge');

        exec(
          'aws',
          [
            'events',
            'put-events',
            '--entries',
            JSON.stringify([
              {
                Source: 'serverless-adapter.e2e',
                DetailType: 'e2e',
                Detail: JSON.stringify({ marker: body }),
              },
            ]),
            '--region',
            region,
          ],
          { inherit: true },
        );

        const payload = await poll(
          'eventbridge log line',
          () => read('eventbridge'),
          EVENT_TIMEOUT_MS,
        );
        const event = JSON.parse(payload);

        assert.equal(event.source, 'serverless-adapter.e2e');
        assert.equal(event.detail.marker, body);
      },
    },
  ];
}
