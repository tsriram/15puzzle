import { puzzle, moves, time, paused, emptyCellIndex } from "./stores";
import { dbGet, dbSet } from "./utils/db";
import shuffle from "lodash.shuffle";
import { get } from "svelte/store";

export const EMPTY = -1;
export const ROWS = 4;
export const COLUMNS = 4;
const SOLVED_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];
let timer;
let dbSaveTimer;

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

export async function initGame() {
  const existingGame = await dbGet("game");
  if (existingGame) {
    puzzle.set(existingGame.puzzle);
    moves.set(existingGame.moves);
    time.set(existingGame.time);
    pauseGame();
    return true;
  }
  return false;
}

function clearGameInDB() {
  dbSet("game", undefined);
}

function startSaveToDBTimer() {
  dbSaveTimer = setInterval(saveGameToDB, 30 * 1000);
}

export async function startNewGame() {
  puzzle.set(getPuzzle());
  moves.set(0);
  time.set(0);
  resumeGame();
  clearGameInDB();
  startTimer();
  startSaveToDBTimer();
}

function startTimer() {
  timer = setInterval(() => {
    time.update((time) => time + 1);
  }, 1000);
}

export function pauseGame() {
  clearInterval(timer);
  clearInterval(dbSaveTimer);
  paused.set(true);
}

export function resumeGame() {
  startTimer();
  paused.set(false);
}

function canMoveLeft(index, emptyCellIndex, colNumber) {
  return index - 1 === emptyCellIndex && colNumber !== 1;
}

function canMoveRight(index, emptyCellIndex, colNumber) {
  return index + 1 === emptyCellIndex && colNumber !== COLUMNS;
}

function canMoveUp(index, emptyCellIndex, rowNumber) {
  return index - COLUMNS === emptyCellIndex && rowNumber !== 1;
}

function canMoveDown(index, emptyCellIndex, rowNumber) {
  return index + COLUMNS === emptyCellIndex && rowNumber !== ROWS;
}

export function canMove(index) {
  const emptyCell = get(emptyCellIndex);
  const cellNumber = index + 1;
  const rowNumber = Math.ceil(cellNumber / COLUMNS);
  const colNumber = cellNumber - (rowNumber - 1) * COLUMNS;

  return (
    canMoveLeft(index, emptyCell, colNumber) ||
    canMoveRight(index, emptyCell, colNumber) ||
    canMoveUp(index, emptyCell, rowNumber) ||
    canMoveDown(index, emptyCell, rowNumber)
  );
}

function saveGameToDB() {
  const game = {
    puzzle: get(puzzle),
    moves: get(moves),
    time: get(time)
  };

  dbSet("game", { ...game });
}

export function handleMove(indexToMove) {
  const isPaused = get(paused);
  if (isPaused) {
    return;
  }
  if (!canMove(indexToMove)) {
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
  saveGameToDB();
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
