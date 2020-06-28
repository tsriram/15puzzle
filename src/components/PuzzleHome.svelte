<script>
  import { startNewGame, initGame } from "../game";
  import PuzzleDemo from "./PuzzleDemo.svelte";
  import NewGame from "./NewGame.svelte";
  import Loading from "./Loading.svelte";
  import Puzzle from "./Puzzle.svelte";
  import { puzzle } from "../stores";
  let promise = initGame();
  let showDemo = false;

  function handleStartFirstGame() {
    showDemo = false;
    promise = new Promise(resolve => {
      startNewGame();
      resolve(true);
    });
  }

  function onShowDemo() {
    showDemo = true;
  }
</script>

<style>
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="content-wrapper">

  {#if showDemo}
    <PuzzleDemo onNewGame={handleStartFirstGame} />
  {:else}
    {#await promise}
      <Loading />
    {:then hasExistingGame}
      {#if hasExistingGame}
        <Puzzle />
      {:else}
        <NewGame onNewGame={handleStartFirstGame} {onShowDemo} />
        <!-- <PuzzleDemo /> -->
      {/if}
    {/await}
  {/if}
</div>
