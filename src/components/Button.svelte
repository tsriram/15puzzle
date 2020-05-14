<script>
  export let onClick;
</script>

<style>
  .btn {
    margin-top: 24px;
    padding: 8px 12px;
    line-height: 1.5;
    text-transform: uppercase;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    font-size: 1.2rem;
    letter-spacing: 2px;
    border: 4px solid var(--grid-border-color);
  }
</style>

<button class="btn" on:click={onClick}>
  <slot />
</button>
