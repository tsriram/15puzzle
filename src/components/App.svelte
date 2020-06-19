<script>
  import GoogleAnalytics from "./GoogleAnalytics.svelte";
  import ServiceWorker from "./ServiceWorker.svelte";
  import PuzzleHome from "./PuzzleHome.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<style>
  .container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: calc(100vh - 40px);
    padding: 20px;
  }
</style>

<main class="container">
  <Header />
  <PuzzleHome />
  <Footer />
</main>
<ServiceWorker />
<GoogleAnalytics />
