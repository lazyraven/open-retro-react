export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

export function setLocalStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}
