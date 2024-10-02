import { classes } from './css-tools.js';

export function hideElem(elem) {
  elem.classList.add(classes.hidden);
}

export function showElem(elem) {
  elem.classList.remove(classes.hidden);
}

export function getWordEnding(number, one, two, many) {
  number = number % 100;
  if (number > 4 && number < 21) return many;
  number = number % 10;
  return number == 1 ? one : number > 1 && number < 5 ? two : many;
}

export function isMobile() {
  return window.innerWidth < 768;
}

export function debounce(callback, duration) {
  let isCooldown = false;

  return (...args) => {
    if (isCooldown) return;

    callback(...args);

    isCooldown = true;
    setTimeout(() => (isCooldown = false), duration);
  };
}
