<script lang="ts">
	import { handleMove, COLUMNS } from '../game';
	import { emptyCellIndex } from '../stores';

	let touchStartX = 0;
	let touchStartY = 0;
	let touchEndX = 0;
	let touchEndY = 0;
	const threshold = 50;

	function handleTouchStart(event: any) {
		touchStartX = event.changedTouches[0].screenX;
		touchStartY = event.changedTouches[0].screenY;
	}

	function handleTouchEnd(event: any) {
		touchEndX = event.changedTouches[0].screenX;
		touchEndY = event.changedTouches[0].screenY;

		const diffX = Math.abs(touchEndX - touchStartX);
		const diffY = Math.abs(touchEndY - touchStartY);

		if (diffX > threshold || diffY > threshold) {
			if (diffX > diffY) {
				// moving right or left
				if (touchEndX < touchStartX) {
					// left
					handleMove($emptyCellIndex + 1);
				} else {
					// right
					handleMove($emptyCellIndex - 1);
				}
			} else {
				if (touchEndY < touchStartY) {
					// up
					handleMove($emptyCellIndex + COLUMNS);
				} else {
					// down
					handleMove($emptyCellIndex - COLUMNS);
				}
			}
		}
	}
</script>

<svelte:window on:touchstart={handleTouchStart} on:touchend={handleTouchEnd} />
