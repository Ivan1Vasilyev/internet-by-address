import { showElem, hideElem } from '../../utils/helpers.js';
import { attributes } from '../../utils/css-tools.js';

export default class FilterExecutor {
  constructor(cards, displayShowMore) {
    this._cards = cards;
    this._displayShowMore = displayShowMore;
  }

  selectedFilters = {
    provider: [],
    type: [],
    speed: {},
  };

  executeFilters = () => {
    this._cards.forEach((card) => {
      if (this._checkFilters(card)) {
        showElem(card);
        card.setAttribute(attributes.filtered, true);
      } else {
        hideElem(card);
        card.removeAttribute(attributes.filtered);
      }
    });

    this._displayShowMore();
  };

  _checkFilters = (card) => this._filterByProvider(card) && this._filterByType(card) && this._filterBySpeed(card);

  _filterByProvider = (card) => {
    if (this.selectedFilters.provider.length) {
      const cardProvider = card.getAttribute(attributes.filterByProvider);
      return this.selectedFilters.provider.includes(cardProvider);
    }
    return true;
  };

  _filterByType = (card) => {
    if (this.selectedFilters.type.length) {
      const cardTariffType = card.getAttribute(attributes.filterByTariffType);
      return this.selectedFilters.type.includes(cardTariffType);
    }
    return true;
  };

  _filterBySpeed = (card) => {
    const { higher, value } = this.selectedFilters.speed;

    if (!value) return true;

    const cardSpeed = parseInt(card.getAttribute(attributes.filterBySpeed), 10);

    if (isNaN(cardSpeed)) return false;

    return higher ? cardSpeed >= value : cardSpeed <= value;
  };
}
