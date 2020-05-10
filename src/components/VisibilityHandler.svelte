<script>
  import { pauseGame } from "../game";
  function handleVisibilityChange() {
    if (document.hidden) {
      pauseGame();
    }
  }
</script>

<svelte:window on:visibilitychange={handleVisibilityChange} />
