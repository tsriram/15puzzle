<script>
  import Button from "./Button.svelte";
  export let onClick;
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
</style>

<div class="container">
  <Button {onClick}>Start New Game</Button>
</div>
