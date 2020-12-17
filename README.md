# Fullstack Serverless Starter Kit

Using AWS Serverless Application Model, Svelte and TypeScript.

## Arc Serverless for easily creating Infrastructure as Code

Architecture - lambdas, queues, etc. are defined under `arc` in `package.json`. Shared code is `src/shared` (all lamdas) and `/src/views` (`GET` requests only)

## Svelte for faster, simpler reactive UI

Frontend code is under `src/frontend`. The UI is built using Svelte, a modern framework that avoids the size and slow performance of a virtual DOM. 

## Dotenv to hold secrets securely

Config is under `.env`, which is not committed for security reasons. 

## A public dir

`public` dir is mapped to `static` in each lambda.

## What's next:

 - Add SCSS
 - Add Mongo

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
