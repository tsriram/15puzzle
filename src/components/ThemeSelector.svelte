<script>
  import { getItem, setItem } from "../utils/storage";
  import { onMount } from "svelte";

  const THEME_KEY = "theme";
  let theme = "light";
  try {
    theme = getItem(THEME_KEY);
  } catch (e) {
    // ignore
  }

  function toggleTheme() {
    const { classList } = document.querySelector("html");
    classList.remove(theme);
    theme = theme === "light" ? "dark" : "light";
    classList.add(theme);
    try {
      setItem(theme);
    } catch (e) {
      // ignore
    }
  }
</script>

<style>
  .btn-toggle-theme {
    background: none;
    border: none;
    font-size: 2rem;
    padding: 0;
    cursor: pointer;
  }
  .btn-toggle-theme:active {
    background-color: transparent;
  }
</style>

{#if theme !== undefined}
  <button class="btn-toggle-theme" on:click={toggleTheme} title="Toggle theme">
    {#if theme === 'dark'}🔆{:else}🌚{/if}
  </button>
{/if}
