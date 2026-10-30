# End-to-end smoke tests

Deploys one fixture app per cloud, sends the same request matrix through the
real provider, then tears everything down. Every resource carries an
`expire-at` tag and a scheduled reaper deletes anything that outlives its run,
so a cancelled job cannot leave a bill behind.

## What it covers

| Cloud        | Covered                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------- |
| AWS          | HTTP API v2, REST API v1, ALB, Function URL, SQS, SNS, S3, DynamoDB Streams, EventBridge |
| Azure        | Functions v4 with the HTTP trigger                                                       |
| DigitalOcean | Functions with `web: raw`                                                                |

Not covered: Huawei (manual zip upload and a `bootstrap` file) and Lambda@Edge
(CloudFront propagation makes a single deploy and delete take about 15 minutes).

## Commands

```bash
# The fixture and the cases, no cloud account needed
npm run e2e:local

# Deploy, test and destroy in one process
npm run e2e:run -- --cloud aws
npm run e2e:run -- --cloud azure
npm run e2e:run -- --cloud do

# One phase at a time
npm run e2e:up -- --cloud aws
npm run e2e:test -- --cloud aws
npm run e2e:down -- --cloud aws
npm run e2e:leftovers -- --cloud aws

# Keep the resources after a run for debugging
npm run e2e:run -- --cloud aws --keep

# Delete anything past its expiry
npm run e2e:reap -- --dry-run
npm run e2e:reap
```

`e2e:run` calls `down` from a `finally`, then `leftovers`, and exits non-zero if
either the test or the teardown failed. `e2e:leftovers` fails when anything is
still findable by name.

## How teardown works

- AWS: `sam delete` after emptying the S3 event bucket. The Lambda log group is
  created by the service, not the stack, so it is deleted explicitly.
- Azure: `az group delete`. The resource group is the whole unit, so one call
  removes the function app, the plan and the storage account.
- DigitalOcean: `doctl serverless undeploy`, then the build directory is removed.
- The reaper is independent of OpenTofu and Terraform state. It finds resources
  by tag and by the run id in the name, so it also cleans up a run whose state
  file was lost.

An untagged resource is only reaped when the run id in its name is more than six
hours old, which keeps the reaper away from a run in flight.

## One-time setup

Use a dedicated sandbox account, subscription and DigitalOcean project. The
reaper deletes by tag, and the blast radius should be a sandbox.

### AWS

1. Create a GitHub OIDC provider for `token.actions.githubusercontent.com` with
   audience `sts.amazonaws.com`.
2. Create a role trusted for `repo:H4ad/serverless-adapter:ref:refs/heads/main`.
3. Give it `PowerUserAccess` plus `IAMFullAccess` in the sandbox account. The
   stack creates a Lambda role and an instance profile-free ALB VPC.
4. Add repository variables `AWS_ROLE_ARN` and `AWS_REGION`.
5. On first run, `npm run e2e:up` creates
   `sae2e-artifacts-<account>-<region>` with a one-day object lifecycle. Override
   the name with `E2E_ARTIFACT_BUCKET`.

### Azure

```bash
az ad app create --display-name serverless-adapter-e2e
# then add a federated credential:
az ad app federated-credential create \
  --id <app-id> \
  --parameters '{
    "name": "github",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:H4ad/serverless-adapter:ref:refs/heads/main",
    "audiences": ["api://AzureADTokenExchange"]
  }'
# then assign Contributor on a dedicated resource group or subscription:
az role assignment create --assignee <app-id> --role Contributor --scope /subscriptions/<subscription-id>
```

Add repository variables `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`,
`AZURE_SUBSCRIPTION_ID` and `AZURE_LOCATION`. There is no client secret:
`azure/login` exchanges the GitHub token for an Azure token.

### DigitalOcean

1. Create a personal access token with Functions write access.
2. `doctl serverless namespaces list` and note the namespace id (`fn-...`).
3. Add the secret `DIGITALOCEAN_ACCESS_TOKEN` and the variables `DO_NAMESPACE`
   (the namespace id, not the display name) and `DO_REGION`.

The namespace itself is not deleted. Only the function deployed by a run is.

## Guardrails

- A dedicated sandbox per cloud.
- `timeout-minutes` on every job.
- `down` runs from `finally` in `e2e:run`, and the workflow does not rely on
  that alone.
- The reaper runs every six hours and is also the only thing that runs when a
  job is cancelled.
- Budget alerts are advisory in all three clouds. Tag-based deletion is the
  actual control.

## Cost

Cents per run: a few Lambdas and API Gateways for under an hour, a consumption
plan and a small storage account in Azure, a few functions in DigitalOcean. The
run is not the risk. A leaked ALB or resource group is, which is why the reaper
exists.

## Adding a provider

1. Add the provider to `src/adapters` and the fixture route if it is not HTTP.
2. Create `e2e/<cloud>/` with `names.ts`, a function entry, and `up`, `test`,
   `down`, `leftovers`.
3. Export `cloudModule` from `e2e/<cloud>/index.ts`.
4. Add the loader in `e2e/cli.ts` and the reaper branch in `e2e/reap.ts`.
5. Add a matrix entry to `.github/workflows/e2e.yml`.
