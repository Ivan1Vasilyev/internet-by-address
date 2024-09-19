import { selectors } from './css-tools.js';

export function hideElem(elem) {
  elem.classList.add(selectors.hidden);
}

export function showElem(elem) {
  elem.classList.remove(selectors.hidden);
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

  return () => {
    if (isCooldown) return;

    callback();

    isCooldown = true;
    setTimeout(() => (isCooldown = false), duration);
  };
}
