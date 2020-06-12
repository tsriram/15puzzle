import { get } from "svelte/store";
import { time } from "../stores";

export function trackExit() {
  if (ga !== undefined) {
    ga("send", {
      hitType: "event",
      eventCategory: "Game",
      eventAction: "Close app",
      eventLabel: "Time",
      eventValue: get(time)
    });
  }
}

export function trackNewGame() {
  if (ga !== undefined) {
    ga("send", {
      hitType: "event",
      eventCategory: "Game",
      eventAction: "New Game",
      eventLabel: "New Game",
      eventValue: get(time)
    });
  }
}

export function trackSolvedPuzzle() {
  if (ga !== undefined) {
    ga("send", {
      hitType: "event",
      eventCategory: "Game",
      eventAction: "Solved",
      eventLabel: "Solved",
      eventValue: get(time)
    });
  }
}
