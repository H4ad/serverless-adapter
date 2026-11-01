# End-to-end smoke tests

Deploys one fixture app per cloud, sends the same request matrix through the
real provider, then tears everything down. Every resource carries an
`expire-at` tag and a scheduled reaper deletes anything that outlives its run,
so a cancelled job cannot leave a bill behind.

## Layout

The suite is a pnpm workspace. The root package is the published library; these
packages are private and never published:

| Package                | Holds                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `packages/e2e-core`    | Fixture app, request matrix, run id, shell and state helpers |
| `packages/e2e-cli`     | The `up`/`test`/`down`/`leftovers`/`reap` entry point        |
| `packages/e2e-<cloud>` | One package per cloud: deploy, test, teardown and template   |

Each cloud package imports the library from `src/` by relative path, so a run
needs no build step, and imports shared code as `@e2e/core/...`. A cloud package
declares only what that cloud needs, which is why the AWS SDK types live in
`e2e-edge` and the Azure Functions v4 alias lives in `e2e-azure`.

## What it covers

| Cloud        | Covered                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------- |
| AWS          | HTTP API v2, REST API v1, ALB, Function URL, SQS, SNS, S3, DynamoDB Streams, EventBridge |
| AWS edge     | Lambda@Edge at origin-request, one distribution, run by hand after a release             |
| Azure        | Functions v4 with the HTTP trigger                                                       |
| DigitalOcean | Functions with `web: raw`                                                                |
| GCP          | Cloud Functions gen2 with the HTTP trigger                                               |
| Firebase     | Functions v2 with the HTTPS trigger                                                      |

Not covered: Huawei (manual zip upload, a `bootstrap` file, and a long-lived
AK/SK with no GitHub OIDC federation) and the `LambdaEdgeAdapter` that rewrites
a CloudFront request and forwards it. Verifying the latter needs an origin that
echoes request headers, so only its unit tests cover it today. The documented
`RequestLambdaEdgeAdapter` is what the edge run exercises.

## Commands

```bash
# The fixture and the cases, no cloud account needed
pnpm e2e:local

# Deploy, test and destroy in one process
pnpm e2e:run --cloud aws
pnpm e2e:run --cloud azure
pnpm e2e:run --cloud do
pnpm e2e:run --cloud gcp
pnpm e2e:run --cloud firebase
pnpm e2e:run --cloud edge

# One phase at a time
pnpm e2e:up --cloud aws
pnpm e2e:test --cloud aws
pnpm e2e:down --cloud aws
pnpm e2e:leftovers --cloud aws

# Keep the resources after a run for debugging
pnpm e2e:run --cloud aws --keep

# Delete anything past its expiry
pnpm e2e:reap --dry-run
pnpm e2e:reap
```

`e2e:run` calls `down` from a `finally`, then `leftovers`, and exits non-zero if
either the test or the teardown failed. `e2e:leftovers` fails when anything is
still findable by name.

The edge run is not in `.github/workflows/e2e.yml`. It has its own workflow,
`.github/workflows/e2e-edge.yml`, because one deploy and one delete take 30 to
60 minutes of mostly waiting. Neither workflow runs on a schedule: both are
`workflow_dispatch` only, so a cloud account is never touched without someone
asking for it.

## How teardown works

- AWS: `sam delete` after emptying the S3 event bucket. The Lambda log group is
  created by the service, not the stack, so it is deleted explicitly.
- AWS edge: CloudFormation deletes the distribution and the function versions.
  If it refuses, the distribution is disabled, waited on and deleted by hand,
  and the stack delete is retried. A Lambda@Edge version stays replicated in
  every edge location that served it, so the reaper retries every six hours
  until the version is finally removable.
- Azure: `az group delete`. The resource group is the whole unit, so one call
  removes the function app, the plan and the storage account.
- DigitalOcean: `doctl serverless undeploy`, then the build directory is removed.
- GCP and Firebase: `gcloud functions delete` and `firebase functions:delete`.
  Both deploy a Cloud Run function, so a single reaper sweep covers both.
- The reaper is independent of OpenTofu and Terraform state. It finds resources
  by tag, label and the run id in the name, so it also cleans up a run whose
  state file was lost.

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
5. On first run, `pnpm e2e:up` creates
   `sae2e-artifacts-<account>-<region>` with a one-day object lifecycle. Override
   the name with `E2E_ARTIFACT_BUCKET`.
6. The edge job uses the same role. It creates a CloudFront distribution and a
   private S3 origin, which `PowerUserAccess` already covers.

### GCP

Cloud Functions gen2 deploys a Cloud Run service, so the project needs billing
enabled and both APIs on.

1. Create a sandbox project and enable `cloudfunctions.googleapis.com`,
   `run.googleapis.com`, `cloudbuild.googleapis.com`,
   `artifactregistry.googleapis.com` and `eventarc.googleapis.com`.
2. Create a service account with `roles/cloudfunctions.developer`,
   `roles/run.admin`, `roles/iam.serviceAccountUser`,
   `roles/cloudbuild.builds.editor`, `roles/storage.admin`,
   `roles/artifactregistry.writer` and `roles/logging.viewer`.
3. Create a Workload Identity pool and provider trusted for
   `repo:H4ad/serverless-adapter:ref:refs/heads/main`, with the
   `google.subject` mapping `assertion.sub`.
4. Add repository variables `GCP_PROJECT`, `GCP_REGION` (default
   `us-central1`), `GCP_WORKLOAD_IDENTITY_PROVIDER` and `GCP_SERVICE_ACCOUNT`.

The deploy passes `--update-labels`, because `gcloud functions deploy` has no
`--labels` flag. Labels cannot contain a colon or a dot, so the expiry is
flattened to a value such as `20261031t205300z`.

### Firebase

Firebase Functions v2 runs on Cloud Run as well, so it shares the GCP project
and the same Workload Identity provider. The project has to be on the Blaze plan
and registered with Firebase.

```bash
firebase projects:addfirebase <project-id>
```

Add `roles/firebase.admin` to the service account, and enable
`firebase.googleapis.com` and `firebasemessaging.googleapis.com` (the second one
is not needed for HTTPS functions, but the CLI checks it during setup). The
workflow sets `FIREBASE_PROJECT` from `GCP_PROJECT`.

The deploy writes a minimal Firebase project into
`packages/e2e-firebase/build` before calling `firebase deploy`, because the CLI
refuses to run from the repository root. The build directory is removed by
`down` and ignored by git.

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
- Budget alerts are advisory in every cloud. Tag-based and label-based deletion
  is the actual control.

## Cost

Cents per run: a few Lambdas and API Gateways for under an hour, a consumption
plan and a small storage account in Azure, a few functions in DigitalOcean, two
scale-to-zero Cloud Run functions. The run is not the risk. A leaked ALB, a
resource group or an edge distribution is, which is why the reaper exists.

The edge run is the one exception to the "cents" rule if it leaks: a CloudFront
distribution is not expensive by itself, but it is the resource the reaper has
the most trouble deleting, so the release job is watched rather than left
unattended.

## Adding a provider

1. Add the provider to `src/adapters` and the fixture route if it is not HTTP.
2. Create `packages/e2e-<cloud>/` with `src/names.ts`, a function entry, and
   `up`, `test`, `down`, `leftovers`, following an existing package.
3. Export `cloudModule` from `packages/e2e-<cloud>/src/index.ts` and give the
   package a `package.json` with `"@e2e/core": "workspace:*"`.
4. Add the package to `packages/e2e-cli/package.json`, the loader in
   `packages/e2e-cli/src/cli.ts` and the reaper branch in
   `packages/e2e-cli/src/reap.ts`.
5. Add a matrix entry to `.github/workflows/e2e.yml`. A slow provider gets its
   own dispatch-only workflow instead, like `e2e-edge.yml`.
