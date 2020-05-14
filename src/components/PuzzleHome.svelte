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

<div>
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
