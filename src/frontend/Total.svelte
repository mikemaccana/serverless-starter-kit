<script type="ts">
  export let name:string;
  export let color: string;
  export let count:string;
</script>

<div class="total">
  <div class="color" style="background-color: #{color}"></div>
  <div class="name">
    {name}
  </div>
  <div class="count">
    {count}
  </div>
</div>

<style>

  .total {
    display: grid;
    grid-template-rows: 24px auto;
    grid-template-columns: 24px auto;
    align-items: center;
    grid-gap: 2px;
  }

  .total .color {
    height: 12px;
    width: 12px;
    grid-column: 1;
    grid-row: 1;
    border-radius: 50%;
    justify-self: right;
	}

  .total .name {
		font-size: 18pt;
    line-height: 18pt;
    grid-column: 2;
    grid-row: 1;
    justify-self: left;
    /* Font has additional space at top */
    padding-bottom: 2px;
	}

	.total .count {
		font-size: 44pt;
    grid-column: 2;
    grid-row: 2;
    justify-self: left;
	}
</style>