import { showElem, hideElem } from '../utils/helpers.js';
import { attributes, selectors } from '../utils/css-tools.js';

export default class ShowMore {
  _isAllShown = false;
  _descStep = 6;
  _laptopStep = 4;
  _mobStep = 3;

  constructor(buttonContainer, cards, container) {
    this._buttonContainer = buttonContainer;
    this._cards = cards;
    this._filteredCards = cards;
    this._container = container;
    this._button = this._buttonContainer.querySelector(selectors.showMoreButton);
  }

  initShowMore = (innerWidth) => {
    this._setSizeParams(innerWidth);
    this._showMoreTariffs();
    this._setEventListeners();
  };

  displayShowMoreButton = () => {
    this._filteredCards = this._cards.filter((card) => card.hasAttribute(attributes.filtered));

    if (this._step >= this._filteredCards.length) {
      hideElem(this._buttonContainer);
    } else {
      showElem(this._buttonContainer);
    }
    this._showMoreTariffs();
  };

  resizeHandler = (innerWidth) => {
    this._setSizeParams(innerWidth);
    this._resetButton();
    this.displayShowMoreButton();
  };

  _setEventListeners = () => {
    this._button.addEventListener('click', this._showMoreHandler);
  };

  _setSizeParams = (innerWidth) => {
    this._step = innerWidth < 700 ? this._mobStep : innerWidth < 1340 ? this._laptopStep : this._descStep;
    this._showedCount = this._step;
    this._top = window.scrollY + this._container.getBoundingClientRect().top;
  };

  _showMoreTariffs = () => {
    this._filteredCards.forEach((card, index) => {
      if (index >= this._showedCount) {
        hideElem(card);
      } else {
        showElem(card);
      }
    });
  };

  _resetButton = () => {
    this._button.textContent = 'Показать ещё тарифы';
    this._isAllshown = false;
  };

  _showMoreHandler = () => {
    if (this._isAllshown) {
      this._hideAll();
      return;
    }

    this._showedCount += this._step;
    this._showMoreTariffs();

    if (this._showedCount >= this._filteredCards.length) {
      this._button.textContent = 'Скрыть';
      this._isAllshown = true;
    }
  };

  _hideAll = () => {
    this._showedCount = this._step;
    this._resetButton();
    this._showMoreTariffs();

    window.scrollTo({
      top: this._top,
      behavior: 'smooth',
    });
  };
}
