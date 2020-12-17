<script lang="ts">
	import type ObjectLiteral from "./object-literal"
	import Total from './Total.svelte';
	import Chart from 'svelte-frappe-charts';
	import { http } from "./modern-http";

	const log = console.log.bind(console);

	enum palette {
		brown = 'E8AA00',
		green = '3BFF00'
	}

	let labels: string[]
	let createdValues: number[] 
	let closedValues: number[] 

	let totalOpened: number;
	let totalClosed: number;

	let isComplete = false;

	(async function () {
		let response = await http.get("/api/v1/pull-request-summary");
		if (response.status !== "OK") {
			throw new Error(`Error GETting /api/v1/pull-request-summary`);
		}
		let prData = response.body as ObjectLiteral;

		labels = Object.keys(prData.created);
		createdValues = Object.values(prData.created);
		closedValues = Object.values(prData.closed);
		totalOpened = createdValues.reduce(function(a: number, b: number): number {return a+b;})
		totalClosed = closedValues.reduce(function(a: number, b: number): number {return a+b;})
		isComplete = true
	})();

  const data = {
    // labels,
    labels: ["201911", "201912", "202001", "202002", "202003", "202004", "202005", "202006", "202007", "202008", "202009", "202010", "202011", "202012"],
    datasets: [
      {
        name: "Created",
        values: createdValues,
        chartType: "bar",
			},
			{
        name: "Closed",
        // values: createdValues,
        values: [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 2, 2],
        chartType: "bar",
      },
    ],
		
	}

	

	let colors = [`#${palette.brown}`, `#${palette.green}`]

	let barOptions = {
		stacked: 1 
	}

</script>

<main>
	{#if isComplete } 
		<div class="key">
			<Total color="{palette.brown}" name="PRs opened" count="{String(totalOpened)}"/>
			<Total color="{palette.green}" name="PRs closed" count="{String(totalClosed)}"/>
		</div>

		<!-- Compiler produces odd warning here: https://github.com/sveltejs/language-tools/issues/718 -->
		<!-- See demo at https://codesandbox.io/s/frappe-charts-demo-viqud?from-embed=&file=/src/index.js for badly named 'data' variable -->
		<Chart {data} type="axis-mixed" {colors} {barOptions}/>
	{:else}

		<p>Please wait...</p>
	
	{/if}

</main>

<style>
	main {
		display: grid;
		width: 100vw;
		height: -webkit-fill-available;
		grid-template-columns: 200px auto;
		max-width: 1000px;
		align-content: center;
	}

	p {
		text-align: center;
		grid-area: 1 / 1 / 2 / 3;
	}

	.key {
		width: 200px;
		height: 100px;
	}


</style>