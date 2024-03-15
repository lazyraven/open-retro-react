export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

export function setLocalStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

export function setBoardMemberLocalStorage({ boardId, member }) {
  const prevStorage = getLocalStorage("boardMember");
  const result = setLocalStorage("boardMember", {
    ...prevStorage,
    [boardId]: member,
  });
  return result;
}

export function getBoardMemberLocalStorage({ boardId }) {
  return getLocalStorage("boardMember")[boardId] || getLocalStorage("member");
}

export function parseDateTime(timeNumber) {
  return typeof timeNumber === "number"
    ? new Date(timeNumber).toDateString()
    : timeNumber;
}
