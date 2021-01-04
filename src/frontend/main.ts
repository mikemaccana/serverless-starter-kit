import App from "./App.svelte";
import type ObjectLiteral from "./object-literal";

const app = new App({
  target: document.body,
  props: {
    name: "Serverless Starter Kit",
  },
});

export default app;
