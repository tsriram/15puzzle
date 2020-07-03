<script>
  import {
    puzzle,
    moves,
    minutesString,
    secondsString,
    paused
  } from "../stores";
  import { handleMove, resumeGame } from "../game";
  import VisibilityHandler from "./VisibilityHandler.svelte";
  import KeyboardHandler from "./KeyboardHandler.svelte";
  import PuzzleComplete from "./PuzzleComplete.svelte";
  import PuzzleActions from "./PuzzleActions.svelte";
  import TouchHandler from "./TouchHandler.svelte";
  import PuzzleBoard from "./PuzzleBoard.svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  function handleResumeGame() {
    if ($paused) {
      resumeGame();
    }
  }
</script>

<style>
  .puzzle-container {
    max-width: var(--max-width);
    display: grid;
    width: 100%;
  }

  .game-info {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 16px 0;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .time {
    justify-self: end;
  }
</style>

<div class="puzzle-container" in:fly={{ y: 100, duration: 200, delay: 50 }}>
  <div class="game-info">
    <div class="moves">
      <span class="label">Moves</span>
      <span>{$moves}</span>
    </div>
    <div class="time">
      <span class="label">Time</span>
      <span>{`${$minutesString}:${$secondsString}`}</span>
    </div>
  </div>
  <PuzzleBoard
    puzzle={$puzzle}
    {handleResumeGame}
    paused={$paused}
    {handleMove} />
  <PuzzleActions />

  <KeyboardHandler />
  <TouchHandler />
  <VisibilityHandler />
  <PuzzleComplete />
</div>
