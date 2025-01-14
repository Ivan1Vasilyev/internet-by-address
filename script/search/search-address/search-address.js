import { keyboardDict } from '../../utils/constants.js';
import { selectors, classes, attributes } from '../../utils/css-tools.js';
import drawMatchesService from '../../services/draw-matches-service.js';

export default class SearchAddress {
  _streets = [];
  _isFocusHandlerFired = false;

  constructor(container, lock, unlock) {
    this._container = container;
    this._lockAlphabet = lock;
    this._unlockAlphabet = unlock;
    this._resultContainer = container.querySelector(selectors.searchResult);
  }

  focusHandler = () => {
    if (this._isFocusHandlerFired) return;
    this._isFocusHandlerFired = true;
    this._streets = [...this._container.querySelectorAll(selectors.resultItem)];
  };

  inputHandler = (e) => {
    const { value } = e.target;
    this._resultContainer.innerHTML = null;

    if (value) {
      this._lockAlphabet();
      this._container.classList.add(classes.filling);
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
      this.resetTextInputHandler();
    }
  };

  resetTextInputHandler = () => {
    this._unlockAlphabet();
    this._container.classList.remove(classes.filling);
  };

  _executeSearch = (searchValue) => {
    let links = [];
    this._streets.forEach((i) => {
      if (i.getAttribute(attributes.find).includes(searchValue.toLowerCase())) {
        const link = i.cloneNode(true);
        link.textContent = '';
        link.insertAdjacentHTML('beforeend', drawMatchesService.drawMatches(searchValue, i.textContent));
        links.push(link);
      }
    });

    this._resultContainer.append(...links);
  };
}
