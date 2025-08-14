# Copilot Instructions for arc-themes-components

## Project Overview

- This repo provides presentational React components and utility functions for Arc Themes, focusing on composability and reusability for client developers.
- Components are organized under `src/components/`, utilities under `src/utils/`, and shared SCSS under `src/scss/`.
- The main entry point is `index.js`, which exports all major components and utilities for external use.

## Architecture & Patterns

- Each component resides in its own folder under `src/components/`, following a flat structure. Example: `src/components/button/`.
- Utilities are grouped by function in `src/utils/`, often as single-purpose modules (e.g., `format-url`, `get-image-from-ans`).
- SCSS is modularized per component and aggregated via `scss.scss` and `src/scss/index.test.scss`.
- Style tokens for components are documented/generated via `scripts/generate-style-tokens-md.js` and `style-token-descriptions.json`.
- Components and utilities are imported and exported alphabetically in `index.js` (enforced by ESLint).

## Developer Workflows

- **Build Storybook:** `npm run storybook` (dev server), `npm run build-storybook` (static build)
- **Lint JS/JSX:** `npm run lint` (all), `npm run lint:fix` (autofix), `npm run lint:changed-feature-branch` (only changed files)
- **Lint SCSS:** `npm run lint:styles`, `npm run lint:styles:fix`
- **Format:** `npm run format` (Prettier)
- **Test:** `npm run test` (Jest, coverage), `npm run test:watch`, `npm run test:changed-feature-branch`
- **Generate Component:** `npm run generate:component` (Hygen template)

## Testing & Coverage

- Jest is configured via `jest.config.js` with coverage thresholds and ignores for stories, configs, and scripts.
- SCSS unit tests use `sass-true` and are located in `__tests__/scss.test.js`.
- Coverage reports are output to `/coverage`.

## Conventions & Integration

- Use named exports for all components/utilities in `index.js`.
- ESLint (Airbnb + Prettier) and Stylelint (Sass Guidelines) are enforced.
- Module aliases for Fusion integration are mocked in tests via Babel config.
- External dependencies include Arc Publishing SDKs, Storybook, Testing Library, and Sass tooling.
- For image handling, use utility functions like `getImageFromANS`, `imageANSToImageSrc`, and `format-image-resizer-src`.
- Style tokens are documented per component in `STYLE-TOKENS.md` (auto-generated).

## Key Files & Directories

- `src/components/` — All presentational React components
- `src/utils/` — Utility modules for formatting, data extraction, hooks
- `scss.scss` & `src/scss/` — Shared and component SCSS
- `index.js` — Main export hub
- `scripts/generate-style-tokens-md.js` — Style token documentation generator
- `jest/` — Test setup and mocks
- `__tests__/` — Unit tests

## Example Patterns

- Alphabetical import/export order in `index.js`
- Component style tokens documented in `STYLE-TOKENS.md`
- Utility function usage for image URLs and formatting
- Test mocks for Fusion context/content via Babel aliases

---

If any section is unclear or missing important project-specific details, please provide feedback to improve these instructions.
