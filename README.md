# Fullstack Serverless Starter Kit

<img alt="logos" src="/public/images/logos.svg"/>

 - [AWS SAM](https://aws.amazon.com/serverless/sam/)
 - Ne need to create `sam.yaml` files manually - [Architect Serverless](https://arc.codes) generates them for you. See `arc` in the `package.json` to see the input!
 - Pure ES2017 `await` style code without callbacks for routes or middleware - Arc lambdas simply return responses, and middleware can be chained together by returning a response (ending processing) or a modified request (passing to the next step in middleware) 
 - [Svelte](https://svelte.dev/) using TypeScript, for fast, simple and small code without the overhead of a virtual DOM.
 - [eslint using TypeScript](https://github.com/typescript-eslint/typescript-eslint)
 - tests using [TS jest](https://kulshekhar.github.io/ts-jest/)
 - Types for the Arc `Request` and `Response` objects
 - An `.env` for secrets
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

## Coming next:

 - Add SCSS
 - Add Mongo Atlas (would use AWS DocumentDB but that requires paying for a DocumentDB EC2 instance which is absurdly expensive)

# How to use this repository

## Clone it

```bash
npx degit mikemaccana/fullstack-serverless-starter-kit my-new-app
cd my-new-app
npm install
npm start
```

The Arc sandbox is now running on http://localhost:3333
## Test

```bash
npm test
```
## Deploy the code to AWS

Set up your `~/.aws/credentials` and run:

```bash
npm run deploy
```
