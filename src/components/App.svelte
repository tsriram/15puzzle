<script>
  import GoogleAnalytics from "./GoogleAnalytics.svelte";
  import ServiceWorker from "./ServiceWorker.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import PuzzleHome from "./PuzzleHome.svelte";
  import Logo from "./Logo.svelte";
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
  <Logo />
  <PuzzleHome />
</main>
<ThemeSelector />
<ServiceWorker />
<GoogleAnalytics />
