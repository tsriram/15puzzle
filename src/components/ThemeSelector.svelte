<script>
  import { getItem, setItem } from "../utils/storage";
  import LightMode from "./LightMode.svelte";
  import DarkMode from "./DarkMode.svelte";
  import { theme } from "../stores";
  import { onMount } from "svelte";

  const THEME_KEY = "theme";

  onMount(() => {
    setInitialTheme();
  });

  function getInitialTheme() {
    const themeFromStorage = getItem(THEME_KEY);
    if (themeFromStorage) {
      return themeFromStorage;
    }

    const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const hasSystemThemePreference =
      typeof systemDarkTheme.matches === "boolean";
    if (hasSystemThemePreference) {
      return systemDarkTheme.matches ? "dark" : "light";
    }

    return "dark";
  }

  // TODO: Fix the initial flicker when default theme doesn't match with user selected theme.
  function setInitialTheme() {
    const initialTheme = getInitialTheme();
    theme.update(() => initialTheme);
  }

  function toggleTheme() {
    theme.update(theme => {
      const updatedTheme = theme === "dark" ? "light" : "dark";
      setItem(THEME_KEY, updatedTheme);
      return updatedTheme;
    });
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

{#if $theme === 'dark'}
  <DarkMode />
{:else}
  <LightMode />
{/if}

<button class="btn-toggle-theme" on:click={toggleTheme} title="Toggle theme">
  {#if $theme === 'dark'}🔆{:else}🌚{/if}
</button>
