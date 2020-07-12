<script>
  import { completeGame } from "../game";
  import { trackShare } from "../utils/analytics.js";
  import { isSolved, moves, time } from "../stores";
  import confetti from "canvas-confetti";
  import Button from "./Button.svelte";
  import { onDestroy } from "svelte";

  let showOverlay = false;
  let gameCompletionTime = "";

  export let onNewGame;
  function newGame() {
    showOverlay = false;
    onNewGame();
  }
  const showShareButton = Boolean(navigator.share);

  function share() {
    if (navigator.share) {
      const moveText = $moves === 1 ? "move" : "moves";
      navigator
        .share({
          title: "15 Puzzle",
          text: `Woohoo! I solved a 15 Puzzle in ${gameCompletionTime} using ${$moves} ${moveText} 🎉🎉🎉`,
          url: "https://15puzzle.xyz/"
        })
        .then(trackShare)
        .catch(error => console.log("Error sharing", error));
    } else {
      console.log("NO SHARE");
    }
  }

  function setGameCompletionTime() {
    const minutes = Math.floor($time / 60);
    const seconds = $time % 60;
    if (minutes && minutes === 1) {
      gameCompletionTime = "1 minute ";
    } else if (minutes > 1) {
      gameCompletionTime = `${minutes} minutes `;
    }

    if (seconds === 1) {
      gameCompletionTime += "1 second";
    } else if (seconds > 1) {
      gameCompletionTime += `${seconds} seconds`;
    }
  }

  function boom() {
    confetti({
      particleCount: 100,
      disableForReducedMotion: true,
      angle: 45,
      origin: {
        x: 0,
        y: 0.5
      }
    });
    confetti({
      particleCount: 100,
      disableForReducedMotion: true,
      angle: 135,
      origin: {
        x: 1,
        y: 0.5
      }
    });
  }

  const unsubscribe = isSolved.subscribe(solved => {
    if (solved) {
      completeGame();
      setGameCompletionTime();
      showOverlay = true;
      boom();
    }
  });
  onDestroy(unsubscribe);
</script>

<style>
  .solved-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    font-size: 1.7rem;
    color: white;
    text-align: center;
    justify-content: center;
  }

  .success-content {
    width: var(--max-width);
    margin: 2rem auto;
  }
</style>

{#if showOverlay}
  <div class="solved-overlay">
    <div class="success-content">
      Woohoo! You solved the puzzle in {gameCompletionTime} using {$moves} {$moves === 1 ? 'move' : 'moves'}
      🎉🎉🎉
    </div>
    {#if showShareButton}
      <Button onClick={share}>Tell the World!</Button>
    {/if}
    <Button onClick={newGame}>Start New Game</Button>
  </div>
{/if}
