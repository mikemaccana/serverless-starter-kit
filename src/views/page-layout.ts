const STATIC_DIR = "/_static";

export function layoutPage({
  title,
  websocketURL,
}: {
  title: string;
  websocketURL: string;
}): string {
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
      // Additional concatenation needed to stop browser from seeing the /script
      // and closing the tag early!
      document.write('<script src="http://' + location.hostname +
    ':35729/livereload.js?snipver=1"></' + 'script>')

      // Websocket URL
      window.websocketURL = '${websocketURL}';
    </script> 
  
    <script defer src='${STATIC_DIR}/build/bundle.js'></script>
        
  </head>
  
  <body>
    
  </body>
  </html>`;
}
