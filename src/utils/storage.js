const KEY_PREFIX = "puzzle15:";

export function getItem(key) {
  return window.localStorage.getItem(`${KEY_PREFIX}${key}`);
}

export function setItem(key, value) {
  window.localStorage.setItem(`${KEY_PREFIX}${key}`, value);
}
