<script lang="ts">
  import { arcStatic, arcURL} from './arc-svelte-helpers.ts'
  let message = (window as any).serverVars?.message;
  let attemptedEmail = (window as any).serverVars?.attemptedEmail

</script>

<style>

</style>

<div class="dialog-page">
    
  <form method="post" action={arcURL('/login')}>

    <a href="/">
      <img class="logo" alt="Logo" src={arcStatic('/images/logo-light.svg')} />
    </a>

    <h2>Log in.</h2>

    <div class="input-and-label">
      <!-- svelte-ignore a11y-autofocus -->
      <input name="email" required="required" type="email" autocomplete="off" value={attemptedEmail || ''} placeholder="Email address" autofocus />
      <label for="email">Email address</label>
    </div>

    <div class="input-and-label">
      <input name="password" required="required" type="password" autocomplete="off" placeholder="Password" />
      <label for="password">Password</label>
    </div>

    <button type="submit">Log In</button>

  </form>

  <div class="alternative">
    <p>
      <a href={arcURL('/forgot')}>Forgot your password?</a>
    </p>
    <p>
      Don't have an account?
      <a href={arcURL('/signup')}>Sign up</a>
    </p>
  </div>
</div>
