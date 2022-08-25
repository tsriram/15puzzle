<script lang="ts">
	import { handleMove, COLUMNS, pauseGame, resumeGame } from '../game';
	import { emptyCellIndex } from '../stores';
	import { paused } from '../stores';

	function handleKeydown(event: KeyboardEvent) {
		event.preventDefault();
		const key = event.code;
		switch (key) {
			// TODO: this needs more work - when the "New Game" button is focused and space bar is pressed,
			// what do we want to do?
			// case "Space":
			//   if ($paused) {
			//     resumeGame();
			//   } else {
			//     pauseGame();
			//   }
			//   return;

			case 'ArrowLeft':
				handleMove($emptyCellIndex + 1);
				return;

			case 'ArrowRight':
				handleMove($emptyCellIndex - 1);
				return;

			case 'ArrowDown':
				handleMove($emptyCellIndex - COLUMNS);
				return;

			case 'ArrowUp':
				handleMove($emptyCellIndex + COLUMNS);
				return;

			default:
				return;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
