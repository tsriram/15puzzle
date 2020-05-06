<script>
  import { startNewGame, pauseGame, resumeGame } from "./game.js";
  import GitHubCorner from "./GitHubCorner.svelte";
  import { paused } from "./stores.js";
  import Puzzle from "./Puzzle.svelte";
</script>

<style>
  .container {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .btn {
    margin-top: 24px;
    padding: 8px 12px;
    line-height: 1.5;
    text-transform: uppercase;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    width: 100%;
  }
</style>

<main class="container">
  <Puzzle />
  <GitHubCorner />
  <div class="actions">
    <button class="btn" on:click={startNewGame}>New Game</button>
    {#if $paused}
      <button class="btn" on:click={resumeGame}>Resume</button>
    {:else}
      <button class="btn" on:click={pauseGame}>Pause</button>
    {/if}
  </div>
</main>
