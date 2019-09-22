# Changelog

## v0.3.x beta

Integrate all related libraries into a mono-repo. Includes general cleanup and refactoring.

## v0.2.3 beta

- Updated `jest` to resolve potential security issue
  - Affects dev only
- Correctly placed `wasp-graphql` in dependencies instead of devDependencies

## v0.2.2 beta

- Updated dev packages
  - Skipped updating `jest-fetch-mock` due to its newest update breaking our tests
- Removed Node v6 build from Travis CI for now; not sure why our integration tests have started to break there, but we're working on a different strategy for integration testing anyway
- Added Github templates
- Removed dead code path (the undeveloped subscription method)
- Minor update to Jest settings (now ignoring node_modules code path)
- Minor update to Travis build (now caches node_modules)
- Added slight clarification to LICENSE (still MIT)
- Removed unnecessary url from README
- Fixed accidental usage of ES6 syntax

## v0.2.1 beta

- Hotfix; previous version was published without a necessary `pre-release` update
- Updated documentation and tests

## v0.2.0 beta

- Significant revision of `query` and `mutate`
- Significant revision of redux-wasp
- Removed `subscription`; waiting on further testing
- Imports from `wasp-graphql` package as opposed to internal code

## v0.1.0 beta

MVP Release

---

View our [Contributing Guide](CONTRIBUTING.md)

Return to [README](README.md)
