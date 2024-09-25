import { attributes, selectors } from '../../../utils/css-tools';

export default class FilterButtons {
  resetHandlers = [];
  _filtersState = {};

  constructor(container, executeFilters, closePopup) {
    this._executeFilters = executeFilters;
    this._resetButton = container.querySelector(selectors.reset);
    this._executeButton = container.querySelector(selectors.executeButton);
    this._closePopup = closePopup;
  }

  setEventListeners() {
    this._resetButton.addEventListener('click', this._resetButtonHandler);
    this._executeButton.addEventListener('click', this._executeHandler);
  }

  _executeHandler() {
    this._executeButton.setAttribute(attributes.disabled, true);
    this._executeFilters();
    this._closePopup();
  }

  _resetButtonHandler() {
    this._executeButton.removeAttribute(attributes.disabled);
    this._resetButton.setAttribute(attributes.disabled, true);
    this.resetHandlers.forEach((i) => i());
  }

  inputHandler = (state) => {
    this._executeButton.removeAttribute(attributes.disabled);

    this._filtersState[state[0]] = !!state[1];
    if (this._checkState()) {
      this._resetButton.setAttribute(attributes.disabled, true);
    } else {
      this._resetButton.removeAttribute(attributes.disabled);
    }
  };

  _checkState = () => Object.values(this._filtersState).every((i) => i);
}
