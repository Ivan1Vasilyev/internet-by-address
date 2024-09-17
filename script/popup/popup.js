import { classes, selectors } from '../utils/css-tools.js';

export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(classes.opened);
  }

  open = () => {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(classes.opened);
  };

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      const isButton = event.target.closest(selectors.popupCloseButton);
      const isOverlay = event.target.classList.contains(classes.popupOverlay);

      if (isButton || isOverlay) {
        this.close();
      }
    });
  }
}
