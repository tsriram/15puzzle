import { writable, derived } from "svelte/store";
import { EMPTY } from "./game.js";

export const paused = writable(false);
export const moves = writable(0);
export const time = writable(0);
export const puzzle = writable([]);
export const darkMode = writable(false);

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
