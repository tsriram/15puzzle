<script>
  import ServiceWorker from "./ServiceWorker.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import Puzzle from "./Puzzle.svelte";
</script>

<style>
  .container {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
</style>

<main class="container">
  <Puzzle />
</main>
<ThemeSelector />
<ServiceWorker />
