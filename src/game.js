import { puzzle, moves, time } from "./stores.js";
import shuffle from "lodash.shuffle";
import { get } from "svelte/store";

export const EMPTY = -1;
const ROWS = 4;
const COLUMNS = 4;
const SOLVED_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];

// temp
const SOLVABLE_PUZZLE1 = [
  1,
  6,
  10,
  14,
  3,
  13,
  7,
  9,
  -1,
  12,
  8,
  4,
  15,
  2,
  11,
  5
];

// There's an efficient way to do this, but this is good enough for our array size, and easy to read / understand
function getInversionCount(array) {
  if (!Array.isArray(array)) {
    throw new Error("countInversions needs an array");
  }
  let inversionCount = 0;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        inversionCount++;
      }
    }
  }
  return inversionCount;
}

export function getPuzzle() {
  let puzzle = shuffle(SOLVED_STATE);
  let count = 0;
  while (!isPuzzleSolvable(puzzle) && count < 10) {
    puzzle = shuffle(SOLVED_STATE);
    count++;
  }
  if (count >= 10) {
    return SOLVABLE_PUZZLE1;
  } else {
    return puzzle;
  }
}

export function startNewGame() {
  puzzle.set(getPuzzle());
  moves.set(0);
  time.set(0);
  startTimer();
}

function startTimer() {
  setInterval(() => {
    time.update((time) => time + 1);
  }, 1000);
}

export function canMove(index, emptyCellIndex) {
  const rows = 4;
  return (
    Math.abs(index - emptyCellIndex) === 1 ||
    Math.abs(index - emptyCellIndex) === rows
  );
}

export function handleMove(indexToMove, emptyCellIndex) {
  if (!canMove(indexToMove, emptyCellIndex)) {
    return;
  }
  const currentPuzzle = get(puzzle);
  const numberToMove = currentPuzzle[indexToMove];
  const updatedPuzzle = currentPuzzle.map((number, index) => {
    if (index === indexToMove) {
      return -1;
    } else if (number === -1) {
      return numberToMove;
    }
    return number;
  });
  puzzle.set(updatedPuzzle);
  moves.update((moves) => moves + 1);
}

// https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
// our grid width is even (for now)
function isPuzzleSolvable(puzzle) {
  const emptyCellIndex = puzzle.indexOf(EMPTY);
  const inversionCount = getInversionCount(puzzle);
  const blankCellRowFromBottom = Math.ceil(
    (puzzle.length - emptyCellIndex + 1) / COLUMNS
  );
  if (blankCellRowFromBottom % 2 === 0) {
    // blank cell on even row from bottom
    return inversionCount % 2 === 1;
  } else {
    return inversionCount % 2 === 0;
  }
}
