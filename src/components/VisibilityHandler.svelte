<script lang="ts">
	import { time, moves, paused } from '../stores';
	import { pauseGame } from '../game';

	function handleVisibilityChange() {
		if (document.hidden) {
			if (($time > 0 || $moves > 0) && $paused === false) {
				pauseGame();
			}
		}
	}
</script>

<svelte:window on:visibilitychange={handleVisibilityChange} />
