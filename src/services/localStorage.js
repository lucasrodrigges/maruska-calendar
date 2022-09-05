export default function setToLS(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}
