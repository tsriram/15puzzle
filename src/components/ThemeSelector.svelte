<script lang="ts">
	import { getItem, setItem } from '../utils/storage';
	import Moon from './icons/Moon.svelte';
	import Sun from './icons/Sun.svelte';
	import { onMount } from 'svelte';

	const THEME_KEY = 'theme';
	let theme: string | null = 'light';
	try {
		theme = getItem(THEME_KEY);
	} catch (e) {
		// ignore
	}

	function toggleTheme() {
		const { classList } = document.querySelector('html')!;
		classList.remove(theme || '');
		theme = theme === 'light' ? 'dark' : 'light';
		classList.add(theme);
		try {
			setItem(THEME_KEY, theme);
		} catch (e) {
			// ignore
		}
	}
</script>

{#if theme !== undefined}
	<button class="btn-toggle-theme" on:click={toggleTheme} title="Toggle theme">
		{#if theme === 'dark'}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</button>
{/if}

<style>
	.btn-toggle-theme {
		background: none;
		border: none;
		font-size: 2rem;
		padding: 0;
		cursor: pointer;
	}
	.btn-toggle-theme:active {
		background-color: transparent;
	}
</style>
