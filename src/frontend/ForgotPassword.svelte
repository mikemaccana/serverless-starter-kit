<script lang="ts">
  import { router, Router, Route, Link } from "yrv";
  import { arcStatic, arcURL} from './arc-svelte-helpers'

</script>

<style>

</style>

<div class="dialog-page">
  <form method="post" action={arcURL('/api/v1/forgot-password')}>

    <a href="/">
      <img class="logo" alt="Logo" src={arcStatic('/images/logo.svg')} />
    </a>

    <h2>Forgot your password?</h2>

    <div class="text-input-and-label">
      <input name="email" required type="email" autocomplete="off" value="" placeholder="Email address" />
      <label for="email">Email address</label>
    </div>

    <button type="submit">Reset your password</button>

  </form>

  <div class="alternative">
    <p>
      <a href={arcURL('/login')}>Log in</a>
    </p>
    <p>
      Don't have an account?
      <a href={arcURL('/signup')}>Sign up</a>
    </p>
  </div>
</div>
