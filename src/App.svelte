<script>
  import GitHubCorner from "./GitHubCorner.svelte";
  import shuffle from "lodash.shuffle";
  import { flip } from "svelte/animate";

  // no fancy puzzle generation yet
  let puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];
  const empty = -1;
  let emptyCellIndex = puzzle.indexOf(empty);
  const rows = 4;
  let moves = 0;

  function shufflePuzzle() {
    puzzle = shuffle(puzzle);
    moves = 0;
  }

  const canMove = (index, emptyCellIndex) => {
    return (
      Math.abs(index - emptyCellIndex) === 1 ||
      Math.abs(index - emptyCellIndex) === rows
    );
  };

  const handleMove = indexToMove => {
    if (!canMove(indexToMove, emptyCellIndex)) {
      return;
    }
    const numberToMove = puzzle[indexToMove];
    puzzle = puzzle.map((number, index) => {
      if (index === indexToMove) {
        return -1;
      } else if (number === -1) {
        return numberToMove;
      }
      return number;
    });
    moves++;
    emptyCellIndex = puzzle.indexOf(empty);
  };
</script>

<style>
  .container {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 416px;
  }

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

  .shuffle-btn {
    margin-top: 24px;
    padding: 8px 12px;
    line-height: 1.5;
    text-transform: uppercase;
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

<main class="container">
  <div class="game-info">
    <div class="moves">
      <span class="label">Moves</span>
      <span>{moves}</span>
    </div>
  </div>
  <div class="puzzle">
    {#each puzzle as cellValue, index (cellValue)}
      <div
        animate:flip={{ duration: 300 }}
        class:cell={cellValue !== empty}
        class:empty-cell={cellValue === empty}
        class:no-move={!canMove(index, emptyCellIndex)}
        on:click={() => handleMove(index)}>
        {cellValue === empty ? '' : cellValue}
      </div>
    {/each}
  </div>
  <GitHubCorner />
  <button class="shuffle-btn" on:click={shufflePuzzle}>New Game</button>
</main>
