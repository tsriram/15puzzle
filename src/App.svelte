<script>
  import GitHubCorner from "./GitHubCorner.svelte";
  import { startNewGame } from "./game.js";
  import Puzzle from "./Puzzle.svelte";
</script>

<style>
  .container {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 416px;
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
</main>
