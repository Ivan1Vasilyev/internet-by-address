import drawMatchesService from '../services/draw-matches-service.js';
import { classes, attributes } from '../utils/css-tools.js';
import { keyboardDict } from '../utils/constants.js';

export default class SearchBase {
  _items = [];
  _isFocusHandlerFired = false;

  constructor(container, itemListSelector, resultListSelector, itemSelector) {
    this._itemsContainer = container.querySelector(itemListSelector);
    this._resultContainer = container.querySelector(resultListSelector);
    this._itemSelector = itemSelector;
    this.inputHandler = this.inputHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  inputHandler(e) {
    const { value } = e.target;
    this._resultContainer.innerHTML = null;

    if (value) {
      this._itemsContainer.classList.add(classes.filling);
      let searchValue = '';

      if (/[A-z]/.test(value)) {
        for (let i = 0; i < value.length; i++) {
          searchValue += keyboardDict[value[i]] || value[i];
        }
      } else {
        searchValue = value;
      }

      this._executeSearch(searchValue);
    } else {
      this.resetHandler();
    }
  }

  _getLink(elem) {
    return elem;
  }

  _sortItemsHandler = (a, b) =>
    drawMatchesService.getFirstMatchIndex(this._getLink(a)) - drawMatchesService.getFirstMatchIndex(this._getLink(b));

  _executeSearch = (searchValue) => {
    const nodes = [];
    this._items.forEach((i) => {
      if (i.getAttribute(attributes.find).includes(searchValue.toLowerCase())) {
        const node = i.cloneNode(true);
        const link = this._getLink(node);
        const sourceValue = link.textContent;
        link.textContent = '';
        link.insertAdjacentHTML('beforeend', drawMatchesService.drawMatches(searchValue, sourceValue));
        nodes.push(node);
      }
    });

    this._resultContainer.append(...nodes.sort(this._sortItemsHandler));
  };

  resetHandler() {
    this._itemsContainer.classList.remove(classes.filling);
  }

  focusHandler = () => {
    if (this._isFocusHandlerFired) return;
    this._isFocusHandlerFired = true;
    this._items = [...this._itemsContainer.querySelectorAll(this._itemSelector)];
  };
}
