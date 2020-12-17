<script lang="ts">
	export let name: string;
</script>

<main>
	<p>Hello {name}</p>
</main>

<style>
	main {
		display: grid;
		width: 100vw;
		height: -webkit-fill-available;
		align-content: center;
		justify-items: center;
	}

	p {
		text-align: center;
		grid-area: 1 / 1 / 2 / 3;
	}

</style>