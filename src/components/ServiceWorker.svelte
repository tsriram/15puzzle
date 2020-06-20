<script>
  import { trackInstall } from "../utils/analytics.js";
  import { Workbox, messageSW } from "workbox-window";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  let showRefreshPrompt = false;
  let onAcceptRefresh;

  onMount(() => {
    registerSW();

    window.addEventListener("appinstalled", () => {
      trackInstall();
    });
  });

  function createUIPrompt({ onAccept, onReject }) {
    onAcceptRefresh = onAccept;
    showRefreshPrompt = true;
  }

  function refresh() {
    if (typeof onAcceptRefresh === "function") {
      onAcceptRefresh();
      showRefreshPrompt = false;
    }
  }

  function registerSW() {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");

      const showSkipWaitingPrompt = event => {
        const prompt = createUIPrompt({
          onAccept: async () => {
            wb.addEventListener("controlling", event => {
              window.location.reload();
            });
            messageSW(event.sw, { type: "SKIP_WAITING" });
          },

          onReject: () => {
            prompt.dismiss();
          }
        });
      };

      wb.addEventListener("waiting", showSkipWaitingPrompt);
      wb.addEventListener("externalwaiting", showSkipWaitingPrompt);

      wb.register();
    }
  }
</script>

<style>
  .refresh-prompt {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    background-color: var(--bg-color);
  }

  .refresh-prompt-button {
    padding: 8px;
    text-transform: uppercase;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    font-size: 1.2rem;
    letter-spacing: 2px;
    border: 4px solid var(--grid-border-color);
    margin: 0 0 0 10px;
  }

  .refresh-prompt-button:active {
    background-color: var(--button-bg-color);
  }
</style>

{#if showRefreshPrompt}
  <div
    class="refresh-prompt"
    in:fly={{ y: 100, duration: 300 }}
    out:fly={{ y: 100, duration: 300 }}>
    <span>There's a new version of this app.</span>
    <button class="refresh-prompt-button" on:click={onAcceptRefresh}>
      Update
    </button>
  </div>
{/if}
