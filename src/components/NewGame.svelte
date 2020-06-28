<script>
  import Button from "./Button.svelte";
  export let onNewGame;
  export let onShowDemo;
</script>

<style>
  .container {
    display: grid;
    max-width: var(--max-width);
    margin-top: 2rem;
    grid-gap: 16px;
  }
  .intro {
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: justify;
  }
</style>

<div class="container">
  <div class="intro">
    15 Puzzle is a sliding puzzle that consists of a frame of numbered square
    tiles in random order with one tile missing. The object of the puzzle is to
    place the tiles in order by making sliding moves that use the empty space.
  </div>
  <Button onClick={onShowDemo}>Show me a demo</Button>
  <Button onClick={onNewGame}>Start New Game</Button>
</div>
