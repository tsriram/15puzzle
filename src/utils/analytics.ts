import { get } from 'svelte/store';
import { time } from '../stores';

export function trackExit() {
	if (ga !== undefined) {
		ga('send', {
			hitType: 'event',
			eventCategory: 'Game',
			eventAction: 'Close app',
			eventLabel: 'Time',
			eventValue: get(time)
		});
	}
}

export function trackNewGame() {
	if (window.ga !== undefined) {
		ga('send', {
			hitType: 'event',
			eventCategory: 'Game',
			eventAction: 'New Game',
			eventLabel: 'New Game',
			eventValue: get(time)
		});
	}
}

export function trackSolvedPuzzle() {
	if (window.ga !== undefined) {
		ga('send', {
			hitType: 'event',
			eventCategory: 'Game',
			eventAction: 'Solved',
			eventLabel: 'Solved',
			eventValue: get(time)
		});
	}
}

export function trackShare() {
	if (window.ga !== undefined) {
		ga('send', {
			hitType: 'event',
			eventCategory: 'Share',
			eventAction: 'Shared',
			eventLabel: 'Shared'
		});
	}
}

export function trackInstall() {
	if (window.ga !== undefined) {
		ga('send', {
			hitType: 'event',
			eventCategory: 'App',
			eventAction: 'Install'
		});
	}
}
