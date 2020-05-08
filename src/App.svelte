<script>
  import GitHubCorner from "./GitHubCorner.svelte";
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
  <GitHubCorner />
</main>
