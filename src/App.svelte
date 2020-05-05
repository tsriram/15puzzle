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

  .new-game-btn {
    margin-top: 24px;
    padding: 8px 12px;
    line-height: 1.5;
    text-transform: uppercase;
  }
</style>

<main class="container">
  <Puzzle />
  <GitHubCorner />
  <button class="new-game-btn" on:click={startNewGame}>New Game</button>
  {#if $paused}
    <button class="pause-game-btn" on:click={resumeGame}>Resume</button>
  {:else}
    <button class="pause-game-btn" on:click={pauseGame}>Pause</button>
  {/if}
</main>
