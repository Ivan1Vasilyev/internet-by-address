import { classes, selectors } from '../utils/css-tools.js';
import { isMobile } from '../utils/helpers.js';

export default class Popup {
  _minTop = 500;
  constructor(popup) {
    this._popup = popup;
    this._popupContainer = popup.querySelector(selectors.popupContainer);
    this._maxTop = window.innerHeight - this._popupContainer.getBoundingClientRect().height;
    this._touchMoveHandler = this._touchMoveHandler.bind(this);
    this._touchStartHandler = this._touchStartHandler.bind(this);
    this._preventDefault = this._preventDefault.bind(this);
    this.close = this.close.bind(this);
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

  _isOutOfScrollBlock = (e) => e.target.closest(selectors.scrollBlock) === null;

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _preventDefault(e) {
    if (this._isOutOfScrollBlock(e)) e.preventDefault();
  }

  _touchMoveHandler(e) {
    if (!this._isOutOfScrollBlock(e)) return;

    let newTop = e.changedTouches[0].clientY - this._startTouchY + this._currentDiff;
    if (newTop <= 0) {
      newTop = '';
    }

    this._popupContainer.style.top = `${newTop}px`;

    if (newTop >= this._minTop) {
      this.close();
    }
  }

  _touchStartHandler(e) {
    if (!this._isOutOfScrollBlock(e)) return;

    this._currentDiff = this._popupContainer.getBoundingClientRect().top - this._maxTop;
    this._startTouchY = e.changedTouches[0].clientY;
  }

  _disableScrolling() {
    document.body.addEventListener('touchmove', this._preventDefault, {
      passive: false,
    });
    this._popupContainer.addEventListener('touchmove', this._touchMoveHandler);
    this._popupContainer.addEventListener('touchstart', this._touchStartHandler);
  }

  _enableScrolling() {
    document.body.removeEventListener('touchmove', this._preventDefault, {
      passive: false,
    });
    this._popupContainer.removeEventListener('touchmove', this._touchMoveHandler);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      const isCloseButton = e.target.closest(selectors.popupCloseButton);
      const isOverlay = e.target.classList.contains(classes.popupOverlay);

      if (isCloseButton || isOverlay) {
        this.close();
      }
    });
  }
}
