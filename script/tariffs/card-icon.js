import { classes, selectors } from '../utils/css-tools.js';

export default class CardIcon {
  constructor(card) {
    this._card = card;
    this._iconContainer = card.querySelector(selectors.iconContainer);
  }

  setEventListeners = () => {
    this._card.addEventListener('click', this._clickHandler);
  };

  _clickHandler = (e) => {
    this._iconContainer.querySelectorAll(selectors.iconOpened).forEach((icon) => icon.classList.remove(classes.opened));
    e.target.closest(selectors.icon)?.classList.add(classes.opened);
  };
}
