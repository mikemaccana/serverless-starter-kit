# Serverless Starter Kit

<img alt="logos" src="/public/images/logos.svg"/>

 - [AWS SAM](https://aws.amazon.com/serverless/sam/)
 - No need to create `sam.yaml` files manually - [Architect Serverless](https://arc.codes) generates them for you. See `arc` in the `package.json`!
 - Pure ES2017 `await` style code *with no callbacks used for routes or middleware* - Arc lambdas simply return responses, and middleware can be chained together by returning a response (ending processing) or a modified request (passing to the next step in middleware) 
 - [Svelte](https://svelte.dev/) using TypeScript, for fast, simple and small code without the overhead of a virtual DOM.
 - [eslint using TypeScript](https://github.com/typescript-eslint/typescript-eslint)
 - tests using [TS jest](https://kulshekhar.github.io/ts-jest/)
 - Types for the Arc `Request` and `Response` objects
 - An `.env` for secrets
 - Users and passwords using bcrypt
 - A neat HTML5 view
 - Live Reloading

## Arc Serverless for easily creating Infrastructure as Code

[Architect Serverless](https://arc.codes) provides a simple way for JS/TS apps to build infrastructure as code. Architecture - lambdas, queues, etc. are defined under `arc` in `package.json`. Shared code is `src/shared` (all lambdas) and `/src/views` (`GET` requests only). A full working sandbox exists for local development. Routes and middleware use `async/await`, without needing callbacks. 
## Svelte for faster, simpler reactive UI

Frontend code is under `src/frontend`. The UI is built using Svelte, a modern framework that avoids the size and slow performance of a virtual DOM. 

## Dotenv to hold secrets securely

Config is under `.env`, which is not committed for security reasons. 

## A public dir

`public` dir is mapped to `static` in each lambda.

## LiveReloading 

The browser will automatically reload when frontend assets are updated.

# How to use this repository

## Clone it

```bash
npx degit mikemaccana/serverless-starter-kit my-new-app
cd my-new-app
npm install
```

## Set up the DB

Install MongoDB, then `cp .env.example .env` to make an env file. Then start MongoDB.

## Start the app

Just run:

```
npm start
```

The [Architect sandbox](https://arc.codes/) is now running on http://localhost:3333
## Test

```bash
npm test
```

Or to run a single test suite or test:

```bash
npm test-filter "Auth"
```

## Deploy the code to AWS

Set up your `~/.aws/credentials` and run:

```bash
npm run deploy
```

## Get started with Architect Serverless and Svelte

See the docs for [Architect Serverless](https://arc.codes/) and [Svelte](https://svelte.dev/)

 - Frontend code, including Svelte components, is in `src/frontend`
 - Images and global CSS is in `public/images` and `public/css`
 - Backend code is in `src/http`, `src/ws`, code shred between all routes is in `src/shared` and `src/views`. If you make changes to `src/shared` and `src/views`, `scripts/update-shared-and-views.sh` will update the necessary symlinks for you.
 - Infrastructure (including routes, buckets, etc) is in `package.json` under the `arc` key.

## Issues are welcome, but pull requests are better!

Please don't just spam me asking for things. 

## Changelog

See [CHANGELOG.md]
