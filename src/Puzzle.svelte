<script>
  import {
    puzzle,
    moves,
    minutesString,
    secondsString,
    paused
  } from "./stores.js";
  import {
    handleMove,
    canMove,
    EMPTY,
    startNewGame,
    resumeGame
  } from "./game.js";
  import VisibilityHandler from "./VisibilityHandler.svelte";
  import KeyboardHandler from "./KeyboardHandler.svelte";
  import PuzzleActions from "./PuzzleActions.svelte";
  import TouchHandler from "./TouchHandler.svelte";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";

  onMount(() => {
    startNewGame();
  });

  function handleResumeGame() {
    if ($paused) {
      resumeGame();
    }
  }
</script>

<style>
  .puzzle-container {
    max-width: 416px;
    display: grid;
    width: 100%;
  }

  .puzzle {
    display: grid;
    position: relative;
    grid-template: repeat(4, 1fr) / repeat(4, 1fr);
    border: 4px solid var(--grid-border-color);
    padding: 2px;
    grid-gap: 2px;
    width: 100%;
    box-sizing: border-box;
  }

  .puzzle.paused::before {
    background: rgba(0, 0, 0, 0.5);
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .paused-text {
    position: absolute;
    display: none;
    color: white;
  }

  .puzzle.paused .paused-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-self: center;
    font-size: 3rem;
    text-transform: uppercase;
  }

  .hint {
    font-size: 1rem;
    text-transform: none;
  }

  .cell,
  .empty-cell {
    display: inline-flex;
    background-color: var(--cell-bg-color);
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: var(--cell-text-color);
    cursor: pointer;
    width: 100%;
  }

  .empty-cell {
    background-color: transparent;
    border: 2px solid transparent;
    pointer-events: none;
  }

  .cell::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
  }

  .no-move {
    cursor: not-allowed;
  }

  .game-info {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 16px 0;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .game-info .label {
    margin-right: 12px;
  }

  .time {
    justify-self: end;
  }
</style>

<div class="puzzle-container">
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
  <div class="puzzle" class:paused={$paused} on:click={handleResumeGame}>
    {#each $puzzle as cellValue, index (cellValue)}
      <div
        animate:flip={{ duration: 120 }}
        class:cell={cellValue !== EMPTY}
        class:empty-cell={cellValue === EMPTY}
        class:no-move={!canMove(index)}
        on:click={() => handleMove(index)}>
        {cellValue === EMPTY ? '' : cellValue}
      </div>
    {/each}
    <div class="paused-text">
      <div>Paused</div>
      <div class="hint">Click to resume</div>
    </div>
  </div>
  <PuzzleActions />
  <KeyboardHandler />
  <TouchHandler />
  <VisibilityHandler />
</div>
