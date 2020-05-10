<script>
  import { startNewGame, pauseGame, resumeGame } from "../game";
  import { paused } from "../stores";
</script>

<style>
  .btn {
    margin-top: 24px;
    padding: 8px 12px;
    line-height: 1.5;
    text-transform: uppercase;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    font-size: 1.2rem;
    letter-spacing: 2px;
    border: 4px solid var(--grid-border-color);
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
</style>

<div class="actions">
  <button class="btn" on:click={startNewGame}>New Game</button>
  {#if $paused}
    <button class="btn" on:click={resumeGame}>Resume</button>
  {:else}
    <button class="btn" on:click={pauseGame}>Pause</button>
  {/if}
</div>
