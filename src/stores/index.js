import { writable, derived } from "svelte/store";
import { EMPTY } from "../game";

export const theme = writable("light");
export const paused = writable(false);
export const moves = writable(0);
export const time = writable(0);
export const puzzle = writable([]);

export const emptyCellIndex = derived(puzzle, ($puzzle) =>
  $puzzle.indexOf(EMPTY)
);

export const minutesString = derived(time, ($time) => {
  const minutes = Math.floor($time / 60);
  return String(minutes).padStart(2, "0");
});

export const secondsString = derived(time, ($time) => {
  const seconds = $time % 60;
  return String(seconds).padStart(2, "0");
});

export const isSolved = derived(puzzle, ($puzzle) => {
  let solved = true;
  for (let i = 1; i <= $puzzle.length; i++) {
    if ($puzzle[i] !== i) {
      solved = false;
      break;
    }
  }
  return solved;
});
