<script>
  import ServiceWorker from "./ServiceWorker.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import PuzzleHome from "./PuzzleHome.svelte";
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
  <PuzzleHome />
</main>
<ThemeSelector />
<!-- <ServiceWorker /> -->
