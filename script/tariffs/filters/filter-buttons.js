import { attributes, selectors } from '../../utils/css-tools.js';

export default class FilterButtons {
  exResetHandlers = [];
  exExecuteHandlers = [];
  _filtersState = {};

  constructor(container) {
    this._resetButton = container.querySelector(selectors.reset);
    this._executeButton = container.querySelector(selectors.executeButton);
  }

  setEventListeners() {
    this._resetButton.addEventListener('click', this._resetButtonHandler);
    this._executeButton.addEventListener('click', this._executeHandler);
  }

  _executeHandler = () => {
    this._executeButton.setAttribute(attributes.disabled, true);
    this.exExecuteHandlers.forEach((handler) => handler());
  };

  _resetButtonHandler = () => {
    this._executeButton.removeAttribute(attributes.disabled);
    this._resetButton.setAttribute(attributes.disabled, true);
    this.exResetHandlers.forEach((handler) => handler());
  };

  inputHandler = ({ key, value }) => {
    this._executeButton.removeAttribute(attributes.disabled);

    this._filtersState[key] = !!value;
    if (this._isAllClear()) {
      this._resetButton.setAttribute(attributes.disabled, true);
    } else {
      this._resetButton.removeAttribute(attributes.disabled);
    }
  };

  _isAllClear = () => Object.values(this._filtersState).every((i) => i);
}
