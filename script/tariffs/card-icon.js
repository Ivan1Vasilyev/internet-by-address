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
    const currentIcon = e.target.closest(selectors.icon);
    [...this._iconContainer.querySelectorAll(selectors.iconOpened)].forEach((i) => {
      if (i !== currentIcon) {
        i.classList.remove(classes.opened);
      }
    });

    currentIcon?.classList.toggle(classes.opened);
  };
}
