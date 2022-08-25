const KEY_PREFIX = '15puzzle:';

export function getItem(key: string) {
	return window.localStorage.getItem(`${KEY_PREFIX}${key}`);
}

export function setItem(key: string, value: string) {
	window.localStorage.setItem(`${KEY_PREFIX}${key}`, value);
}
