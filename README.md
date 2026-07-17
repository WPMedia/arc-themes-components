# Arc Themes Components

`@wpmedia/arc-themes-components` is the shared library of presentational React components and reusable utility functions used across Arc Themes. A core tenet of Themes is composability for developers, and this package provides the building blocks (Image, Link, Button, Carousel, etc.) and helpers that Themes blocks and client developers compose into experiences.

## Getting Started

This package is published to GitHub Packages under the `@wpmedia` scope. To install dependencies you need an `.npmrc` pointing the scope at GitHub Packages with a token that has `read:packages`:

```
@wpmedia:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
registry=https://registry.npmjs.org
```

1. `nvm use` to match the Node version in `.nvmrc`
2. `npm i` to install packages
3. `npm run storybook` to view the components in Storybook on port 6006

## Scripts

### `npm run test`

Runs all tests (jest) with coverage. Coverage thresholds are enforced in `jest.config.js`.

### `npm run test:changed-feature-branch`

Runs tests for all files that have changed since `origin/main`. This runs on pre-push via [Husky](https://github.com/typicode/husky#usage) (see [`.husky/pre-push`](./.husky/pre-push)).

### `npm run lint`

Runs `eslint` across `src`, `.storybook`, and `index.js`.

### `npm run lint:changed-feature-branch`

Runs `eslint` only on the `.js`/`.jsx` files that have changed since `origin/main`. Runs on pre-push and in CI.

### `npm run lint:styles` / `npm run lint:styles:fix`

Runs (and auto-fixes) `stylelint` across all `.scss` files.

### `npm run format`

Runs Prettier across the repo.

### `npm run generate:component`

Scaffolds a new component with hygen.

## Releasing

This repo uses **trunk-based development**. All work is merged into `main`, and the `themesVersion` field in the root `package.json` determines which themes release version components are published under.

### Publishing (automatic)

Every merge to `main` that changes component code (`.js`, `.jsx`, `.json`, `.scss`, or a `README.md`) triggers the [publish workflow](./.github/workflows/sync-themes-branch-with-themes-tag.yml). It reads `themesVersion` from `package.json` and publishes a unique version of the package to GitHub Packages under the dist-tag `arc-themes-release-version-<themesVersion>`.

The published version string is an ephemeral, canary-style version (`<base>-arc-themes-release-version-<themesVersion-dashed>.<run-number>`) — nothing is committed back to `main`. Consumers always install by dist-tag, so the exact version string does not matter:

```bash
npm install @wpmedia/arc-themes-components@arc-themes-release-version-4.0.1
```

No manual steps are needed — just merge your PR and the package is published.

### Bumping to a new themes version

When you're ready to start a new themes release (e.g., moving from `4.0.1` to `4.1.0`):

1. Create a PR that changes `themesVersion` in `package.json` from `"4.0.1"` to `"4.1.0"`
2. Merge the PR into `main`
3. The publish workflow will automatically:
   - Tag the previous version's final commit as `themes-v4.0.1`
   - Begin publishing under the dist-tag `arc-themes-release-version-4.1.0`

The git tag provides a permanent record of exactly which commit was the last publish for each version, and can be used to view history or create hotfix branches later.

```bash
# View what shipped in a specific version
git log themes-v4.0.0..themes-v4.0.1

# View what's been published in the current version so far
git log themes-v4.0.1..main
```

### Hotfixing a previous version

Hotfixes are for the rare case when you need to patch a version you've already moved past. A dedicated [hotfix workflow](./.github/workflows/hotfix.yml) handles publishing.

1. Find the tag for the version you need to fix:
   ```bash
   git tag -l "themes-v*"
   ```

2. Create a hotfix branch from that tag:
   ```bash
   git checkout -b hotfix/4.0.1 themes-v4.0.1
   ```

3. Make your fix, commit, and push:
   ```bash
   git push -u origin hotfix/4.0.1
   ```

4. The hotfix workflow runs automatically and publishes the fix under the original dist-tag (`arc-themes-release-version-4.0.1`).

> **Note:** Hotfix branches are not merged back into `main`. If the fix is also needed on `main`, cherry-pick it into a separate PR targeting `main`.

## dist-tags

Please see the [release notes in Confluence](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2344910925/Themes+Releases) if you are a Themes developer.

The package is published with dist-tags in the format `arc-themes-release-version-X.Y.Z`, corresponding to the `themesVersion` in `package.json` at the time of publish. These are consumed by the [Theme Manifest repo](https://github.com/WPMedia/arc-themes-manifests).

## License

See [LICENSE.md](./LICENSE.md).
