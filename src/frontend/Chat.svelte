<script lang="ts">
  import { log } from "./basics";
  import type ObjectLiteral from "./object-literal";

  // https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript?rq=1
  let websocketURL = (window as any).websocketURL;

  // setup the web socket
  let websocket = new WebSocket(websocketURL);
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

  <!-- svelte-ignore a11y-autofocus -->
  <input placeholder="Enter message" on:keyup={sendMessage} bind:value={composedMessage} autofocus>
</div>