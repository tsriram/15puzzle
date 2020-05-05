<script>
  import {
    puzzle,
    moves,
    minutesString,
    secondsString,
    emptyCellIndex,
    paused
  } from "./stores.js";
  import { handleMove, canMove, EMPTY, startNewGame } from "./game.js";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";

  onMount(() => {
    startNewGame();
  });
</script>

<style>
  .puzzle-container {
    max-width: 416px;
    display: grid;
    width: 100%;
  }

  .puzzle {
    display: grid;
    grid-template: repeat(4, 1fr) / repeat(4, 1fr);
    border: 5px solid purple;
    padding: 2px;
    grid-gap: 2px;
    width: 100%;
    box-sizing: border-box;
  }

  .cell,
  .empty-cell {
    display: inline-flex;
    background-color: cadetblue;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
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
  <div class="puzzle">
    {#each $puzzle as cellValue, index (cellValue)}
      <div
        animate:flip={{ duration: 120 }}
        class:cell={cellValue !== EMPTY}
        class:empty-cell={cellValue === EMPTY}
        class:no-move={!canMove(index, $emptyCellIndex)}
        on:click={() => handleMove(index, $emptyCellIndex)}>
        {cellValue === EMPTY ? '' : cellValue}
      </div>
    {/each}
  </div>
</div>
