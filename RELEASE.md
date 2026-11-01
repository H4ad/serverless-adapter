# Release

Releases are published to npm as `@h4ad/serverless-adapter` from `main`, driven by
[Release Please](https://github.com/googleapis/release-please).

## Normal releases

1. Open a PR. The PR title follows [Conventional Commits](https://www.conventionalcommits.org/),
   because a squash merge turns the title into the commit message.
2. Release Please keeps a `chore: release x.y.z` PR open with the version bump and the
   `CHANGELOG.md` entry.
3. Merging the release PR creates `vx.y.z` and publishes it with the `latest` dist-tag.

Never edit `version` in `package.json` by hand. Release Please writes it, and the manifest in
`.release-please-manifest.json` is the source of truth. The one exception is a release from the
manual workflow, where the workflow sets the version at build time.

## Releases from an old line

Use the manual `Release` workflow when a released version needs a fix and `main` already holds
work you are not ready to ship. Three modes, set by two inputs:

| Mode | Inputs | Version | npm dist-tag | GitHub release |
|------|--------|---------|--------------|----------------|
| Hotfix | none | `4.4.1-hotfix.0` | `hotfix` | prerelease |
| Patch on the old line | `stable` | `4.4.1` | `release-4.4` | normal |
| Patch as the new default | `stable` and `latest` | `4.4.1` | `latest` | normal |

`stable` means "publish a plain version instead of a prerelease". `latest` means "point the
`latest` dist-tag at it", and it is separate on purpose: a patch of an old line usually should
not take over `latest` from a newer release. Without `latest`, the version gets a dist-tag named
after its own line (`release-4.4` for `4.4.2`), so that line stays installable on its own. The
GitHub release follows npm: a run that points npm `latest` at its version passes `--latest`, and
every other run passes `--latest=false`, so the repository's Latest badge stays on the newest
release instead of moving back to an old line.

### When to use it

- A bug is reported on a released version, for example `v4.4.0`
- `main` has breaking changes or features staged that must not go out with the fix
- You need to patch the old version only

### How to run one

1. Create a branch from the release tag, named `hotfix/*`:

   ```sh
   git checkout -b hotfix/4.4.1 v4.4.0
   ```

   The workflow refuses any other ref, so the people who can publish this way are exactly the
   people who can push a `hotfix/*` branch.

   The workflow file has to exist on that branch, since `workflow_dispatch` runs the version
   of the file in the selected ref. A tag cut before this job was added will not have it, so
   bring the current file over first and commit it:

   ```sh
   git checkout main -- .github/workflows/release.yml
   git commit -m "ci: add release workflow to hotfix branch"
   ```

   A tag cut before the pnpm migration has npm's lockfile and no `packageManager` field. The
   workflow handles that on its own: it pins pnpm for the job and installs with `npm ci` when
   there is no `pnpm-lock.yaml`, so bringing only `release.yml` over is still enough.

2. Apply the fix. Open a PR targeting `hotfix/4.4.1` so CI runs, or commit directly.

3. Run **Actions → Release → Run workflow**:

   - Branch: `hotfix/4.4.1`
   - Version: `4.4.1-hotfix.0` for a hotfix, `4.4.1` for a patch
   - Stable: on to publish a plain version. Off for a prerelease hotfix
   - Latest: on only when the patch should become what `npm i @h4ad/serverless-adapter`
     installs for everyone. Requires `stable`
   - Dry run: enable it to build and test without publishing

4. The branch is throwaway. The fix lives in the tag, so delete the branch once the release
   is out.

### If a run fails after publishing

Publishing and the GitHub release are separate steps. When the release step fails after npm has
the version, open the failed run and use **Re-run failed jobs**. A re-run keeps the original
commit and inputs, where a new dispatch takes whatever the branch points at now.

The workflow skips the publish and continues to the tag and the release only when npm already
has the version and its `gitHead` is the commit the run is on. The tag then lands on the source
that was published, even if the dist-tag has moved to a newer version since. In that case the
retry passes `--latest=false`, so the GitHub release does not claim a tag it no longer holds.
Any other already-published version still fails, so a mistyped version cannot ride on an
unrelated release, and a branch that moved cannot put the tag on code that was never published.

If the run cannot be re-run, create the tag and release by hand on the published commit:

```sh
sha=$(npm view @h4ad/serverless-adapter@4.4.1 gitHead)
gh release create v4.4.1 --target "$sha" --title v4.4.1 --latest=false \
  --notes "Patch release published from \`hotfix/4.4.1\`, npm dist-tag \`release-4.4\`."
```

Add `--prerelease` for a hotfix, and use `--latest` instead of `--latest=false` only while npm
`latest` points at that version.

### Choosing a mode

A hotfix goes out under the `hotfix` dist-tag, so `npm i @h4ad/serverless-adapter` keeps
installing the latest stable from `main`. Users opt in with
`npm i @h4ad/serverless-adapter@4.4.1-hotfix.0` or `@hotfix`. Pick this when the fix may still
be withdrawn, or when you want it proven in production before every consumer gets it.

A patch without `latest` is a normal version, but it does not move `latest`, so a bare
`npm i` still installs whatever is newest. Users on the old line get it with
`npm i @h4ad/serverless-adapter@release-4.4`, and existing `^4.4.0` ranges pick it up through
normal resolution. This is the mode to use after a newer major is out: with `5.0.0` on `latest`,
`4.4.2` can still ship under `release-4.4` without touching it.

A patch with `latest` becomes the default install for everyone. Use it only while the line you
are patching is still the newest one, since moving `latest` to an older line is a downgrade for
anyone who already has the newer version. The workflow refuses it when the version is not
greater than what `latest` currently points at.

### What the workflow enforces

- A `hotfix/*` ref, nothing else
- A prerelease semver by default. With `stable` enabled it requires a plain `x.y.z` instead
- `latest` cannot be set without `stable`, since moving it onto a prerelease would make a
  prerelease everyone's default install
- A tag `v<version>` that does not exist yet
- An `<version>` that is not already on npm, unless npm's `gitHead` for it is the commit the run
  is on, which is a retry of a failed release
- A `<version>` whose `major.minor` matches `package.json` on the branch, so a patch of the 4.4
  line cannot be published as `5.0.0`
- With `stable` enabled only: the version must be greater than whatever the target dist-tag
  already points at, so publishing cannot move a tag backwards
- An npm lookup that fails for any reason other than a 404 fails the run. A registry or auth
  error never counts as "not published", since that would let the checks above pass
- Build and the full test suite before anything is published

### What does not change

`.release-please-manifest.json` is not touched in any mode, and neither is `main`. Release
Please keeps computing the next release from `main`'s own history, so a `4.4.1` published here
simply does not appear in the generated changelog.

That is harmless when `main` already holds a feature or a breaking change, because the next
normal release is then a higher version and ordering puts it above the patch.

It is not harmless when the line you patched is still `main`'s line. With the manifest at
`4.4.0` and only `fix` commits waiting, Release Please computes `4.4.1` for its next release,
npm already has it, and the publish step fails with `cannot publish over the previously
published versions`. Set `version` in `.release-please-manifest.json` to the version you just
published and commit it to `main` before the next release PR is merged, so Release Please
computes the one after it.

### After the release

Cherry-pick the fix commits onto `main`, so the next normal release carries them too:

```sh
git checkout main
git cherry-pick <commits>
```

Promoting a `release-4.4` patch to `latest` later is a deliberate `npm dist-tag add`, never part
of this workflow, and only makes sense while the 4.4 line is still the newest one.

### Verifying

```sh
npm view @h4ad/serverless-adapter versions --json | tail -5
npm dist-tag ls @h4ad/serverless-adapter
```

The new version should be listed, and the expected tag should point at it: `hotfix` for a
hotfix, `release-4.4` for a patch on the old line, `latest` for one that became the default.
