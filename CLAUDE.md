# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

`@wpmedia/arc-themes-components` is a single npm package published to GitHub Packages — the shared library of presentational React components and reusable utilities that Arc Themes blocks compose into experiences. Unlike the Themes blocks repo, this is **not** a Lerna monorepo: it's one package with a single `version`, published under a themes release dist-tag.

## Commands

```bash
npm run test                        # Run all tests (jest) with coverage
npm run test -- src/components/image # Run tests for one component
npm run test:watch                  # Watch mode with coverage for changed files
npm run test:changed-feature-branch # Tests for files changed vs origin/main

npm run lint                        # ESLint src, .storybook, index.js
npm run lint:changed-feature-branch # ESLint only files changed vs origin/main
npm run lint:styles                 # Stylelint all SCSS
npm run lint:styles:fix             # Auto-fix SCSS issues

npm run storybook                   # Dev server on port 6006
npm run format                      # Prettier
npm run generate:component          # Scaffold a new component (hygen)
```

## Release Process

Trunk-based development on `main`. The `themesVersion` field in root `package.json` controls which dist-tag the package publishes under (e.g., `"themesVersion": "4.0.1"` → dist-tag `arc-themes-release-version-4.0.1`).

- **Every merge to `main`** that touches component code auto-publishes a unique canary-style version under the current dist-tag (no commit is pushed back to `main`).
- **Version bump**: change `themesVersion` in a PR; on merge the workflow auto-tags the previous version (e.g., `themes-v4.0.1`) and starts publishing under the new one.
- **Hotfix**: create a `hotfix/X.Y.Z` branch from the `themes-vX.Y.Z` tag, push the fix, and it auto-publishes under the original dist-tag.

See [README.md](./README.md#releasing) for full details.

## Architecture

### Layout

- `index.js` — the public entry point. Re-exports every component (alphabetized) and utility. New components must be added here.
- `scss.scss` — the SCSS entry point (`@forward "src/scss"` plus `@use` of components that ship styles).
- `src/components/` — ~27 React components, one directory each.
- `src/utils/` — reusable helpers (`format-image-resizer-src`, `get-focal-from-ans`, `format-authors`, etc.).
- `src/scss/` — shared SCSS (tokens, mixins) consumed via `@use`/`@forward`.

### Component Structure

Each component in `src/components/<name>/` contains:
- `index.jsx` — the component implementation
- `index.test.jsx` — React Testing Library tests
- `index.stories.jsx` — Storybook story
- `index.mdx` — Storybook docs page
- `_index.scss` — styles (BEM naming)
- `themes/*.json` — theme token mappings (`news.json`, `commerce.json`)
- `STYLE-TOKENS.md` — documents the style tokens the component exposes

New components are scaffolded with `npm run generate:component` (hygen templates in `_templates/component/`).

### Fusion Integration

Components may import virtual Fusion modules that don't exist on disk — they're provided by the Fusion runtime and mocked in tests via babel `module-resolver` (`babel.config.js` → `jest/mocks/`):
- `fusion:content`, `fusion:context`, `fusion:properties`, `fusion:intl`, `fusion:environment`

### Testing

- Jest with `jsdom`, setup in `jest/testSetupFile.js`.
- SCSS imports are stubbed via `identity-obj-proxy`.
- Coverage thresholds are enforced globally (statements 80, branches 60, functions 90, lines 80) — see `jest.config.js`.

## Conventions

- Prettier formatting uses **tabs**.
- `index.js` imports are alphabetized (enforced by `import/order` eslint rule).
- Styles use BEM and follow the project stylelint config.
