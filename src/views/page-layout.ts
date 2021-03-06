import {
  CONTENT_TYPES,
  log,
  ObjectLiteral,
  STATUSES,
  stringify,
} from "../shared/utils";
import { Response } from "../shared/architect-types";

const STATIC_DIR = "/_static";

function getWebSocketURL() {
  const env = process.env.NODE_ENV;
  const testing = "ws://localhost:3333";
  const staging = "fixme: these urls are printed after create";
  const production = "fixme: these urls are printed after create";
  if (env === "staging") {
    return staging;
  }
  if (env === "production") {
    return production;
  }
  return testing;
}

export function layoutPage({
  title = "Serverless Starter Kit",
  serverVars = {},
}: {
  title?: string;
  serverVars?: ObjectLiteral;
}): string {
  if (!serverVars) {
    serverVars = {};
  }
  const serverVarsJSON = JSON.stringify(serverVars);

  // Additional concatenation needed to stop browser from seeing the /script
  // and closing the tag early!
  const liveReloadSnippet = `document.write('<script src="http://' + location.hostname +
  ':35729/livereload.js?snipver=1"></' + 'script>')`;

  // Used for passing data to front end app
  const serverVarsSnippet = `window.serverVars = ${serverVarsJSON};`;

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width,initial-scale=1'>
      <title>${title}</title>
    
      <link rel='icon' type='image/png' href='${STATIC_DIR}/images/favicon.png'>
      <link rel='stylesheet' href='${STATIC_DIR}/css/global.css'>
      <link rel='stylesheet' href='${STATIC_DIR}/build/bundle.css'>
      
      <script>
        ${liveReloadSnippet}
        ${serverVarsSnippet}
      </script> 
    
      <script defer src='${STATIC_DIR}/build/bundle.js'></script>      
    </head>
    
    <body>

    </body>
  </html>`;
}

export function makeWebAppResponse(serverVars: ObjectLiteral): Response {
  serverVars.webSocketURL = getWebSocketURL();

  // Redact sensitive info
  if (serverVars.person && serverVars.person.password) {
    delete serverVars.person.password;
  }

  return {
    statusCode: STATUSES.OK,
    headers: {
      "Content-Type": CONTENT_TYPES.html,
    },
    body: layoutPage({
      serverVars,
    }),
  };
}

// Just return the front end web app, since the frontend app will
// show the right UI for the URL
export const webAppResponse = makeWebAppResponse({});

export const notFoundResponse = {
  statusCode: STATUSES["Not Found"],
  headers: {
    "Content-Type": CONTENT_TYPES.html,
  },
  body: layoutPage({
    title: "Not found",
    serverVars: {
      message: "Not found",
    },
  }),
};
