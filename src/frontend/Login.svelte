<script lang="ts">
  import { router, Router, Route, Link } from "yrv";
  import { arcStatic, arcURL} from './arc-svelte-helpers'
  let message = (window as any).serverVars?.message;
  let attemptedEmail = (window as any).serverVars?.attemptedEmail

</script>

<style>

</style>

<div class="dialog-page">
    
  <form method="post" action={arcURL('/login')}>

    <Link href="/">
      <img class="logo" alt="Logo" src={arcStatic('/images/logo-light.svg')} />
    </Link>

    <h2>Log in.</h2>

    <div class="input-and-label">
      <!-- svelte-ignore a11y-autofocus -->
      <input name="email" required={true} type="email" autocomplete="off" value={attemptedEmail || ''} placeholder="Email address" autofocus />
      <label for="email">Email address</label>
    </div>

    <div class="input-and-label">
      <input name="password" required={true} type="password" autocomplete="off" placeholder="Password" />
      <label for="password">Password</label>
    </div>

    <button type="submit">Log In</button>

  </form>

  <div class="alternative">
    <p>
      <Link href="/forgot">
        Forgot your password?
      </Link>
    </p>
    <p>
      Don't have an account?
      <Link href="/signup">
        Sign up
      </Link>
    </p>
  </div>
</div>
