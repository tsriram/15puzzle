<script>
  import {
    puzzle,
    moves,
    minutesString,
    secondsString,
    emptyCellIndex
  } from "./stores.js";
  import { handleMove, canMove, EMPTY, startNewGame } from "./game.js";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";

  onMount(() => {
    startNewGame();
  });
</script>

<style>
  .puzzle {
    display: flex;
    flex-wrap: wrap;
    border: 5px solid purple;
    justify-items: center;
    width: 416px;
  }

  .cell,
  .empty-cell {
    display: inline-flex;
    width: 100px;
    height: 100px;
    background-color: cadetblue;
    border: 2px solid white;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }

  .empty-cell {
    background-color: transparent;
    border: 2px solid transparent;
    pointer-events: none;
  }

  .no-move {
    cursor: not-allowed;
  }

  .game-info {
    display: flex;
    padding: 16px 0;
    font-size: 1.5rem;
    text-transform: uppercase;
    align-self: flex-start;
  }

  .game-info .label {
    margin-right: 12px;
  }
</style>

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
      animate:flip={{ duration: 100 }}
      class:cell={cellValue !== EMPTY}
      class:empty-cell={cellValue === EMPTY}
      class:no-move={!canMove(index, $emptyCellIndex)}
      on:click={() => handleMove(index, $emptyCellIndex)}>
      {cellValue === EMPTY ? '' : cellValue}
    </div>
  {/each}
</div>
