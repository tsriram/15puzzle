<script>
  import { startNewGame, initGame } from "../game";
  import Loading from "./Loading.svelte";
  import Puzzle from "./Puzzle.svelte";
  const promise = initGame();
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
  {:then}
    <Puzzle />
  {/await}
</div>
