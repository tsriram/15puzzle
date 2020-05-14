<script>
  import { startNewGame, pauseGame, resumeGame } from "../game";
  import Button from "./Button.svelte";
  import { paused } from "../stores";
</script>

<style>
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
</style>

<div class="actions">
  <Button onClick={startNewGame}>New Game</Button>
  {#if $paused}
    <Button onClick={resumeGame}>Resume</Button>
  {:else}
    <Button onClick={pauseGame}>Pause</Button>
  {/if}
</div>
