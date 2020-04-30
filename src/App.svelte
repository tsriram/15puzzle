<script>
  import GitHubCorner from "./GitHubCorner.svelte";
  import { flip } from "svelte/animate";

  // no fancy puzzle generation yet
  let puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];
  const empty = -1;
  let emptyCellIndex = puzzle.indexOf(empty);
  const rows = 4;

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
    emptyCellIndex = puzzle.indexOf(empty);
  };
</script>

<style>
  .container {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
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
</style>

<main class="container">
  <div class="puzzle">
    {#each puzzle as cellValue, index (cellValue)}
      <div
        animate:flip={{ duration: 300 }}
        class:cell={index !== emptyCellIndex}
        class:empty-cell={index === emptyCellIndex}
        class:no-move={!canMove(index, emptyCellIndex)}
        on:click={() => handleMove(index)}>
        {cellValue}
      </div>
    {/each}
  </div>
  <GitHubCorner />
</main>
