import { selectors, classes, attributes } from '../utils/css-tools.js';

export default class Sorter {
  constructor(sortContainer, cards, container, displayShowMore) {
    this._sortContainer = sortContainer;
    this._cards = cards;
    this._cardsContainer = container.querySelector(selectors.tariffCardsContainer);
    this._displayShowMore = displayShowMore;
    this._arrButton = this._sortContainer.querySelector(selectors.arrButton);
    this._inputArea = this._sortContainer.querySelector(selectors.inputArea);
    this._sortText = this._sortContainer.querySelector(selectors.filterText);
  }

  setEventListeners = () => {
    this._arrButton.addEventListener('click', this._arrButtonHandler);
    this._inputArea.addEventListener('input', this._inputAreaHandler);
  };

  _arrButtonHandler = () => this._sortContainer.classList.toggle(classes.opened);

  _inputAreaHandler = (e) => {
    const input = e.target;
    if (input.tagName != 'INPUT') return;

    const selectedText = input.closest(selectors.item).querySelector(selectors.text).textContent;
    this._sortCards(input.value);
    this._sortText.textContent = selectedText;
  };

  _sortCards = (sortType) => {
    const sortedCards = this._cards.sort(this._getSortMethods(sortType));
    this._cardsContainer.innerHTML = null;
    this._cardsContainer.append(...sortedCards);
    this._displayShowMore();
  };

  _getSortMethods = (sortType) => {
    switch (sortType) {
      case attributes.sortAction:
      case attributes.sortSpeed:
      case attributes.sortPopularity:
      case attributes.sortMaxPrice:
        return (a, b) => +b.getAttribute(sortType) - +a.getAttribute(sortType);
      case attributes.sortPrice:
        return (a, b) => +a.getAttribute(sortType) - +b.getAttribute(sortType);
    }
  };
}
