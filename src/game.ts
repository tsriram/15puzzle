import { puzzle, moves, time, paused, emptyCellIndex, isSolved, isFirstGame } from './stores';
import { trackNewGame, trackSolvedPuzzle } from './utils/analytics';
import { dbGet, dbSet } from './utils/db';
import shuffle from 'lodash.shuffle';
import { get } from 'svelte/store';

export const EMPTY = -1;
export const ROWS = 4;
export const COLUMNS = 4;
const SOLVED_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];
let timer: number;
let dbSaveTimer: number;

// temp
const SOLVABLE_PUZZLE1 = [1, 6, 10, 14, 3, 13, 7, 9, -1, 12, 8, 4, 15, 2, 11, 5];

export function getPuzzle() {
	let puzzle = shuffle(SOLVED_STATE);
	let count = 0;
	while (!isSolvable(puzzle) && count < 10) {
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
	const existingGame = await dbGet('game');
	if (existingGame && !isPuzzleSolved(existingGame.puzzle)) {
		puzzle.set(existingGame.puzzle);
		moves.set(existingGame.moves);
		time.set(existingGame.time);
		pauseGame();
	} else {
		startFirstGame();
	}
	return true;
}

function setupGame() {
	trackNewGame();
	puzzle.set(getPuzzle());
	moves.set(0);
	time.set(0);
	isSolved.set(false);
}

async function startFirstGame() {
	setupGame();
	isFirstGame.set(true);
}

function startSaveToDBTimer() {
	dbSaveTimer = window.setInterval(saveGameToDB, 30 * 1000);
}

export async function startNewGame() {
	setupGame();

	isFirstGame.set(false);
	resumeGame();
	saveGameToDB();
}

function startTimer() {
	timer = window.setInterval(() => {
		time.update((time) => {
			return time + 1;
		});
	}, 1000);
}

export function completeGame() {
	clearTimers();
	clearGameFromDB();
}

function clearTimers() {
	clearInterval(timer);
	clearInterval(dbSaveTimer);
}

export function pauseGame() {
	clearTimers();
	paused.set(true);
	saveGameToDB();
}

export function resumeGame() {
	if (timer || dbSaveTimer) {
		clearTimers();
	}
	startTimer();
	startSaveToDBTimer();
	paused.set(false);
}

function canMoveLeft(index: number, emptyCellIndex: number, colNumber: number) {
	return index - 1 === emptyCellIndex && colNumber !== 1;
}

function canMoveRight(index: number, emptyCellIndex: number, colNumber: number) {
	return index + 1 === emptyCellIndex && colNumber !== COLUMNS;
}

function canMoveUp(index: number, emptyCellIndex: number, rowNumber: number) {
	return index - COLUMNS === emptyCellIndex && rowNumber !== 1;
}

function canMoveDown(index: number, emptyCellIndex: number, rowNumber: number) {
	return index + COLUMNS === emptyCellIndex && rowNumber !== ROWS;
}

export function canMove(index: number) {
	const emptyCell = get(emptyCellIndex);
	const cellNumber = index + 1;
	const rowNumber = Math.ceil(cellNumber / COLUMNS);
	const colNumber = cellNumber - (rowNumber - 1) * COLUMNS;

	if (rowNumber < 1 || rowNumber > ROWS) {
		return false;
	}

	if (colNumber < 1 || colNumber > COLUMNS) {
		return false;
	}

	return (
		canMoveLeft(index, emptyCell, colNumber) ||
		canMoveRight(index, emptyCell, colNumber) ||
		canMoveUp(index, emptyCell, rowNumber) ||
		canMoveDown(index, emptyCell, rowNumber)
	);
}

function clearGameFromDB() {
	dbSet('game', undefined);
}

function saveGameToDB() {
	const game = {
		puzzle: get(puzzle),
		moves: get(moves),
		time: get(time)
	};

	dbSet('game', { ...game });
}

export function handleMove(indexToMove: number) {
	const isPaused = get(paused);
	if (isPaused) {
		return;
	}
	if (!timer) {
		resumeGame();
	}
	const currentPuzzle = get(puzzle);
	if (isPuzzleSolved(currentPuzzle)) {
		return;
	}
	if (!canMove(indexToMove)) {
		return;
	}
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
	if (isPuzzleSolved(updatedPuzzle)) {
		trackSolvedPuzzle();
		isSolved.set(true);
	}
}

// https://stackoverflow.com/a/34570524/1288404
function isSolvable(puzzle: Array<number>) {
	let inversions = 0;
	const gridWidth = Math.sqrt(puzzle.length);
	let row = 0;
	let rowWithEmptyCell = 0;

	for (let i = 0; i < puzzle.length; i++) {
		if (i % gridWidth === 0) {
			row++;
		}

		if (puzzle[i] === EMPTY) {
			rowWithEmptyCell = row;
			continue;
		}

		for (let j = i + 1; j < puzzle.length; j++) {
			if (puzzle[i] > puzzle[j] && puzzle[j] !== EMPTY) {
				inversions++;
			}
		}
	}

	if (rowWithEmptyCell % 2 === 0) {
		return inversions % 2 === 0;
	} else {
		return inversions % 2 !== 0;
	}
}

function isPuzzleSolved(puzzle: Array<number>) {
	for (let i = 0; i < puzzle.length - 1; i++) {
		if (puzzle[i] !== i + 1) {
			return false;
		}
	}
	return true;
}
