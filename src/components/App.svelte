<script>
  import GoogleAnalytics from "./GoogleAnalytics.svelte";
  import ServiceWorker from "./ServiceWorker.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import PuzzleHome from "./PuzzleHome.svelte";
  import Footer from "./Footer.svelte";
  import Logo from "./Logo.svelte";
</script>

<style>
  .container {
    margin: 2rem auto 0;
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
<Footer />
<ThemeSelector />
<ServiceWorker />
<GoogleAnalytics />
