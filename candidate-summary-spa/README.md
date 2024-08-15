# candidate-summary-spa

# Development

To install project dependencies:
```
yarn
```

See a demonstration within a Storybook at http://localhost:8080/:
```
yarn start
```

Run Vitest unit tests and calculate code coverage:
```
yarn test
```

Run Vitest unit tests automatically when source files are changed:
```
yarn test:watch
```

Run ESLint to discover code style issues:
```
yarn lint
```

To analyze bundle sizes:
```
yarn analyze
```

## API Mocking

[Mock Service Worker](https://mswjs.io/) (MSW) is used for API mocking.
[Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch) is a good blog post that explains its advantages.

API mocks are defined in `src/test-utils/server-handlers.ts`. By default, the same API mocks are used in development
mode (`yarn start`) and unit tests (`yarn test`).

# Building

Use [Vite](https://vitejs.dev/) to generate library ES and UMD bundles, as well as TypeScript definition files:
```
yarn build
```
Output is in the `./dist` directory.

## Continuous Integration

Review the default iPipeline `.build.yml` and SonarQube `sonar-project.properties` and tune them for the needs of
your particular project.

Any merge to "develop" will trigger Jenkins to create a new "Release Candidate" version. The version is tagged
in git, the changelog is not updated, and the build will be pushed to the iCIMS NPM Registry.

Any merge to "master" will trigger Jenkins to create a new release version. The version is tagged in git, the
changelog is updated, and the build will be pushed to the iCIMS NPM Registry.

By default, the version increment is determined by the content of commit messages since the last release.
See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) for more information.