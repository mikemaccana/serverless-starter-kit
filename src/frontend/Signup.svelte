<script lang="ts">
  import { router, Router, Route, Link } from "yrv";
  import { arcStatic, arcURL} from './arc-svelte-helpers'
  let message = (window as any).serverVars?.message;
  let attemptedEmail = (window as any).serverVars?.attemptedEmail

</script>

<style>

</style>

<div class="dialog-page">
  <form method="post" action={arcURL('/signup')}>

    <a href="/">
      <img class="logo" alt="logo" src={arcStatic('/images/logo.svg')} />
    </a>
    <h2>Sign up</h2>

    <p>Enter an email and password to sign up</p>

    <div class="input-and-label">
      <!-- svelte-ignore a11y-autofocus -->
      <input name="given-name" required={true} autocomplete="off" placeholder="Given name" autofocus />
      <label for="given-name">Given name</label>
    </div>

    <div class="input-and-label">
      <input name="family-name" required={true} autocomplete="off" placeholder="Family name" />
      <label for="family-name">Family name</label>
    </div>

    <div class="input-and-label">
      <input name="email" required={true} type="email" autocomplete="off" placeholder="Email address" />
      <label for="email">Email address</label>
    </div>

    <div class="input-and-label">
      <input name="password" required={true} type="password" autocomplete="off" placeholder="Password" />
      <label for="password">Password</label>
    </div>

    <div class="input-and-label checkbox">
      <input type="checkbox" required />
      <label for="tsandcs">Agree to the terms of conditions</label>
    </div>

    <button type="submit">Sign up</button>

  </form>

  <div class="alternative">
    <p>
      Already have an account?
      <Link href="/login">
        Log in
      </Link>
    </p>
  </div>
</div>
