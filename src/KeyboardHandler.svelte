<script>
  import { handleMove, COLUMNS } from "./game.js";
  import { emptyCellIndex } from "./stores.js";

  function handleKeydown(event) {
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        handleMove($emptyCellIndex + 1);
        return;

      case "ArrowRight":
        handleMove($emptyCellIndex - 1);
        return;

      case "ArrowDown":
        handleMove($emptyCellIndex - COLUMNS);
        return;

      case "ArrowUp":
        handleMove($emptyCellIndex + COLUMNS);
        return;

      default:
        return;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
