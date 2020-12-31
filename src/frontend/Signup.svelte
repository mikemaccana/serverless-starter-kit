<script lang="ts">
  import { router, Router, Route, Link } from "yrv";
  import { arcStatic, arcURL} from './arc-svelte-helpers'
  import { getFormDetails } from './get-form-contents'

  import { log } from "./basics";
  import { http } from "./modern-http";

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
      <input name="givenName" required={true} placeholder="Given name" autofocus />
      <label for="givenName">Given name</label>
    </div>

    <div class="input-and-label">
      <input name="familyName" required={true} placeholder="Family name" />
      <label for="familyName">Family name</label>
    </div>

    <div class="input-and-label">
      <input name="email" required={true} type="email" placeholder="Email address" />
      <label for="email">Email address</label>
    </div>

    <div class="input-and-label">
      <input name="password" required={true} type="password" placeholder="Password" />
      <label for="password">Password</label>
    </div>

    <div class="input-and-label checkbox">
      <input name="isTermsAndConditionsAgreed" required={true} type="checkbox" checked={false}/>
      <label for="isTermsAndConditionsAgreed">Agree to the terms of conditions</label>
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
