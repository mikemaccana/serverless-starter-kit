<script lang="ts">
	import { router, Router, Route, Link } from "yrv";
	export let name: string;
	import Chat from "./Chat.svelte"
	import Nav from "./Nav.svelte"
	import Login from "./Login.svelte"
	import Signup from "./Signup.svelte"

	const STATIC_DIR = "/_static";
</script>

<Router>

	<main>	

		<Route exact path="/" let:router>
			<Nav />
			<h1>Hello {name}</h1>
			<img alt="logos" src="{STATIC_DIR}/images/logos.svg"/>
			<Chat />
		</Route>

		<Route exact path="/login" let:router>
			<Login />
		</Route>
		
		<Route exact path="/signup" let:router>
			<Signup />
		</Route>

	</main>
</Router>

<style>
	main {
		display: grid;
		width: 100vw;
		/* Stops the download bar (desktop) and the auto-hiding address bar (mobile) affecting the layout */
		height: -webkit-fill-available;
		align-content: center;
		justify-items: center;
		background-color: #FCF6F0;
	}

	h1 {
		margin: 0;
		text-align: center;
		color: #ff784b;
		font-size: 96pt;
		/* Gradient text effect */
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: linear-gradient(45deg, #ff784b 0%, #be2e2e 33%, #4328ab 66%, #0f2677 100%);
		opacity: 0.8;
	}

</style>