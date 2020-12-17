# Fullstack Serverless Starter Kit

<img alt="logos" src="/public/images/logos.svg" style="margin: 0 auto;"/>

 - [AWS SAM](https://aws.amazon.com/serverless/sam/), with the necessary `sam.yaml` files automatically created using [Architect Serverless](https://arc.codes). All lambdas, events etc use TypeScript.
 - [Svelte](https://svelte.dev/) using TypeScript
 - [eslint using TypeScript](https://github.com/typescript-eslint/typescript-eslint)
 - tests using [TS jest](https://kulshekhar.github.io/ts-jest/)
 - Types for the Arc Request and Response objects
 - A `.env` for secrets
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
## What's next:

 - Add SCSS
 - Add Mongo Atlas (would use AWS DocumentDB but that requires paying for a DocumentDB EC2 instance which is absurdly expensive)
## Test

```bash
npm test
```

## Run locally

The app needs a GitHub auth token specific to your account.

 - Copy `.env.example` to `.env`
 - [Get your own GitHub auth token](https://github.com/settings/tokens/new) and add the token to `.env`.

```bash
npm start
```

## Deploy the code to AWS

Set up your `~/.aws/credentials` and run:

```bash
npm run deploy
```
