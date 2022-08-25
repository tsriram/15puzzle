<script lang="ts">
	import { pauseGame, resumeGame } from '../game';
	import Button from './Button.svelte';
	import { paused } from '../stores';

	export let onStartNewGame: () => void;
</script>

<div class="actions">
	<Button onClick={onStartNewGame}>New Game</Button>
	{#if $paused}
		<Button onClick={resumeGame}>Resume</Button>
	{:else}
		<Button onClick={pauseGame}>Pause</Button>
	{/if}
</div>

<style>
	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 30px;
	}
</style>
