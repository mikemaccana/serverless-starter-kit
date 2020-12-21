import { log, ObjectLiteral } from "../shared/utils";

const STATIC_DIR = "/_static";

export function layoutPage({
  title = "Fullstack Serverless Starter Kit",
  serverVars = {},
}: {
  title?: string;
  serverVars?: ObjectLiteral;
}): string {
  let serverVarsJSON = JSON.stringify(serverVars);

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
