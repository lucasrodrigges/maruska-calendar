export const setToLS = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

export const getFromLS = (key) => JSON.parse(localStorage.getItem(key));
