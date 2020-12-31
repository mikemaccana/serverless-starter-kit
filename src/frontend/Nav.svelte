<script lang="ts">
  import { Link } from "yrv";
</script>

<nav>
  <!-- You are logged in as XXX -->

  <Link href="/login">
    Log in
  </Link>
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