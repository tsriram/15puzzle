<script>
  import PuzzleBoard from "./PuzzleBoard.svelte";
  import { fly } from "svelte/transition";
  import { handleMove } from "../game";
  import Button from "./Button.svelte";
  import { onMount } from "svelte";

  export let onNewGame;

  const demoPuzzleSteps = [
    [1, 2, 3, 4, 5, 6, 7, -1, 9, 10, 12, 8, 13, 14, 11, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, -1, 13, 14, 11, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, 12, 13, 14, 11, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, -1, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1]
  ];
  let step = 0;
  let demoPuzzle = demoPuzzleSteps[step];
  let showStartGameButton = false;

  onMount(() => {
    for (let i = 1; i <= demoPuzzleSteps.length; i++) {
      setTimeout(() => {
        if (i === demoPuzzleSteps.length) {
          showStartGameButton = true;
        } else {
          demoPuzzle = demoPuzzleSteps[i];
        }
      }, i * 1000);
    }
  });
</script>

<style>
  .puzzle-container {
    max-width: var(--max-width);
    display: grid;
    width: 100%;
  }

  .hidden {
    visibility: hidden;
  }

  .title {
    text-align: center;
  }
</style>

<div
  class="puzzle-container"
  in:fly={{ y: 100, duration: 300 }}
  out:fly={{ y: -100, duration: 150 }}>
  <h4 class="title">DEMO</h4>
  <PuzzleBoard
    puzzle={demoPuzzle}
    handleResumeGame={() => undefined}
    paused={false}
    handleMove={() => undefined} />

  <div class:hidden={!showStartGameButton}>
    <Button onClick={onNewGame}>Start a New Game</Button>
  </div>

</div>
