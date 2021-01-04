<script lang="ts">
  import { log } from "./basics";
  import type ObjectLiteral from "./object-literal";

  // https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript?rq=1
  let webSocketURL = (window as any).serverVars?.webSocketURL;

  // setup the web socket
  if ( ! webSocketURL ) {
    throw new Error(`window.serverVars.websocketURL not specified`)
  }
  let websocket = new WebSocket(webSocketURL);
  websocket.onopen = open;
  websocket.onclose = close;
  websocket.onmessage = handleMessage;
  websocket.onerror = console.log;

  let isConnected = null

  const BLANK = ''

  let composedMessage = BLANK;
  let messages: ObjectLiteral[] = []

  function open() {
    isConnected = true
  }

  function close() {
    isConnected = false
  }

  function handleMessage(event) {
    let message = JSON.parse(event.data);
    messages.push(message)
    messages = messages;
  }

  function sendMessage(event) {
    if (event.key == "Enter") {
      websocket.send(JSON.stringify({ text: composedMessage }));
      composedMessage = BLANK
      event.preventDefault();
    }
  };
</script>

<div>
  <p>Connection status: <strong>{#if isConnected} on {:else} off {/if}</strong></p>

  <div class="messages">
    {#each messages as message}
      <p>{message.text}</p>
    {/each}
  </div>

  <p>Type here, and a modified copy of the text will be replied from the server.</p>

  

  <div class="text-input-and-label">
    <!-- svelte-ignore a11y-autofocus -->
    <input name="message" placeholder="Enter message" on:keyup={sendMessage} bind:value={composedMessage} autofocus>
    <label for="message">Enter message</label>
  </div>
</div>