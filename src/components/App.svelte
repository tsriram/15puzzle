<script lang="ts">
	import GoogleAnalytics from './GoogleAnalytics.svelte';
	import ServiceWorker from './ServiceWorker.svelte';
	import PuzzleHome from './PuzzleHome.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	// const isProd = process.env.isProd;
	const isProd = true;
</script>

<main class="container">
	<Header />
	<PuzzleHome />
	<Footer />
</main>
{#if isProd}
	<ServiceWorker />
	<!-- <GoogleAnalytics /> -->
{/if}

<style>
	.container {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: calc(100vh - 40px);
		padding: 20px;
		user-select: none;
	}
</style>
