import { classes, selectors } from '../utils/css-tools.js';
import { isMobile } from '../utils/helpers.js';

export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupContainer = popup.querySelector(selectors.popupContainer);
    this._maxTop = window.innerHeight - this._popupContainer.getBoundingClientRect().height;
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._enableScrolling();
    this._popup.classList.remove(classes.opened);
    this._popupContainer.style.top = '';
  }

  open = () => {
    if (isMobile()) {
      this._disableScrolling();
    } else {
      document.addEventListener('keydown', this._handleEscClose);
    }
    this._popup.classList.add(classes.opened);
  };

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  _preventDefault(e) {
    e.preventDefault();
  }

  _touchMoveHandler = (e) => {
    const diff = this._currentTop - this._maxTop;

    let newTop = e.changedTouches[0].clientY - this._startTouchY + diff;
    if (newTop <= 0) {
      newTop = '';
    }

    this._popupContainer.style.top = newTop + 'px';

    if (newTop >= 250) {
      this.close();
    }
  };

  _touchStartHandler = (e) => {
    this._currentTop = this._popupContainer.getBoundingClientRect().top;
    this._startTouchY = e.changedTouches[0].clientY;
  };

  _disableScrolling() {
    document.body.addEventListener('touchmove', this._preventDefault, { passive: false });
    this._popupContainer.addEventListener('touchmove', this._touchMoveHandler);
    this._popupContainer.addEventListener('touchstart', this._touchStartHandler);
  }

  _enableScrolling() {
    document.body.removeEventListener('touchmove', this._preventDefault, { passive: false });
    this._popupContainer.removeEventListener('touchmove', this._touchMoveHandler);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (isMobile()) return;
      const isButton = event.target.closest(selectors.popupCloseButton);
      const isOverlay = event.target.classList.contains(classes.popupOverlay);

      if (isButton || isOverlay) {
        this.close();
      }
    });
  }
}
