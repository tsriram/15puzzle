<script>
  import LightMode from "./LightMode.svelte";
  import DarkMode from "./DarkMode.svelte";
  import { darkMode } from "../stores";

  function toggleTheme() {
    darkMode.update(darkMode => !darkMode);
  }
</script>

<style>
  .btn-toggle-theme {
    background: none;
    border: none;
    font-size: 2rem;
    position: fixed;
    top: 0;
    right: 10px;
    cursor: pointer;
  }
  .btn-toggle-theme:active {
    background-color: transparent;
  }
</style>

{#if $darkMode}
  <DarkMode />
{:else}
  <LightMode />
{/if}

<button class="btn-toggle-theme" on:click={toggleTheme} title="Toggle theme">
  {#if $darkMode}🔆{:else}🌚{/if}
</button>
