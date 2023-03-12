# Contributing to FabUI

Thank you for your interest in FabUI! Before you begin, be sure to check out the [code of conduct](https://github.com/fabienwnklr/dabui/blob/main/CODE_OF_CONDUCT.md) and the [existing issues](https://github.com/fabienwnklr/dabui/issues).

## Prelude

FabUI is written with the following frameworks and tools:

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lit](https://lit.dev/)
- [Vitest](https://vitest.dev/)
- [Open Web Components testing](https://open-wc.org/docs/testing/testing-package/)

We strongly encourage contributors to be familiarized with these tools.

## Initial Setup

### Installing Dependencies

Before you can start helping with FabUI, you will want to install and configure the following dependencies on your
machine:

- [Git](http://git-scm.com/)

- [Node.js v16.x (LTS)](http://nodejs.org)

- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Forking Supabase on GitHub

To contribute code to FabUI, you need to fork the [repository](https://github.com/fabienwnklr/fabui).

## Setup FabUI on Your Computer

### Clone the Repository

To build FabUI, you clone your fork of the repository:

1. Clone your GitHub forked repository:

```sh
git clone https://github.com/<github_username>/fabui.git
```

2. Go to the Lotion directory:

```sh
cd fabui
```

### Installing dependencies

Install npm dependencies:

```sh
npm i
```

## Start a Development Server

1. Start development server

   ```sh
   npm run dev
   ```

2. To access the local server, enter the following URL into your web browser:

   ```sh
   http://localhost:5173/
   ```

## Writing Tests

1. Run tests

First, familiarize yourself with the libraries we are using for tests.

Lotion uses [**Vitest**](https://vitest.dev) for unit and component tests, as well as [Open Web Components testing](https://open-wc.org/docs/testing/testing-package/) for web components tests.

After cloning the repository to your local environment and running `npm i`, you can run tests with the following:

```sh
npm run test:unit
npm run test:e2e
```

The same tests will run for any PR requested to the `main` branch, and all tests should pass before any PR is merged.

2. Write tests

All new features should be accompanied by at least one test for the new feature.

All bug fixes should be accompanied by a test that replicates the bug.

**When writing a test, check that it fails correctly before checking that it passes.**

## Submit Your Contribution!

After you've made the improvements, you can open a pull request and a member of the Dashibase team (well either SK or Alfred for now!) will work with you on the PR!

Did you have an issue, like a merge conflict, or don't know how to open a pull request? Check out [GitHub's pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) tutorial on how to resolve merge conflicts and other issues.

Once your PR has been merged, you will be proudly listed as a contributor in our [contributor chart](https://github.com/dashibase/dashibase/graphs/contributors)!
