import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import React from 'react';
import styles from './styles.module.css';

export default function HowToStart(): JSX.Element {
  return (
    <section className={styles.howto}>
      <div className={styles.howtoContainer}>
        <div className="row">
          <h1>To start, first, install the library with:</h1>
        </div>
        <div className="row">
          <div className={styles.exampleContainer}>
            <CodeBlock language="bash">
              npm i --save @h4ad/serverless-adapter
            </CodeBlock>
          </div>
        </div>
        <div className={styles.exampleContainer}>
          <p>
            And then you can add support, for example, to{' '}
            <Link to="/docs/main/adapters/aws/api-gateway-v2">
              AWS Api Gateway V2
            </Link>
            {' and '}
            <Link to="/docs/main/adapters/aws/sqs">AWS SQS</Link> to your
            Express App with:
          </p>
          <div>
            <CodeBlock
              language="tsx"
              title="index.ts"
            >{`import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import app from './app';

export const handler = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .addAdapter(new SQSAdapter())
  .build();
            `}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
