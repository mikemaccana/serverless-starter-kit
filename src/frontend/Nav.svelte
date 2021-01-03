

<script lang="ts">  
  import { Link } from "yrv";
  const serverVars = (window as any).serverVars;

</script>

<nav>
  <!-- Show user information -->
  {#if serverVars?.person }
    <p>You're logged in as {serverVars?.person?.givenName}
      <a href="/logout">
        Log out
      </a>
    </p>
  
  {:else}
    <Link href="/login">
      Log in
    </Link>
  {/if}
  
</nav>

<style>
  nav {
    display: grid;
    position: absolute;
    background-color: #212121;
    color: white;
    top: 0;
    width: 100vw;
    height: 96px;
    align-content: center;
    justify-content: end;
    padding: 12px;
  } 

  /* Global because our lLnk will be converted into an 'a' element */
  :global(nav a, nav a:visited, nav a:active, nav a:focus) {
    color: white;
  }
</style>