const KEY_PREFIX = "15puzzle:";

export function getItem(key) {
  return window.localStorage.getItem(`${KEY_PREFIX}${key}`);
}

export function setItem(key, value) {
  window.localStorage.setItem(`${KEY_PREFIX}${key}`, value);
}
