<script lang="ts">
	import ThemeSelector from './ThemeSelector.svelte';
	import Logo from './Logo.svelte';
</script>

<header>
	<div class="theme-selector-wrapper">
		<ThemeSelector />
	</div>
	<div class="logo-wrapper">
		<Logo />
	</div>
</header>

<style>
	header {
		display: grid;
		justify-content: center;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto;
		grid-gap: 16px;
	}
	.theme-selector-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.logo-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
