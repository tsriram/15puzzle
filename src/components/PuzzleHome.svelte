<script>
  import { startNewGame, initGame } from "../game";
  import NewGame from "./NewGame.svelte";
  import Loading from "./Loading.svelte";
  import Puzzle from "./Puzzle.svelte";
  import { puzzle } from "../stores";
  let promise = initGame();

  function handleStartFirstGame() {
    promise = new Promise(resolve => {
      startNewGame();
      resolve(true);
    });
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
  {#await promise}
    <Loading />
  {:then hasExistingGame}
    {#if hasExistingGame}
      <Puzzle />
    {:else}
      <NewGame onClick={handleStartFirstGame} />
    {/if}
  {/await}
</div>
