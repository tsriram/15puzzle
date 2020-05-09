<script>
  import { pauseGame } from "./game.js";
  function handleVisibilityChange() {
    if (document.hidden) {
      pauseGame();
    }
  }
</script>

<svelte:window on:visibilitychange={handleVisibilityChange} />
