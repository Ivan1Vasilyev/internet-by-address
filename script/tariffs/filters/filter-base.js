import { selectors, classes, attributes } from '../../utils/css-tools.js';

export default class FilterBase {
  constructor(filter, selectedFilters, inputHandler) {
    this._filter = filter;
    this._selectedFilters = selectedFilters;
    this._exInputHandler = inputHandler;
    this._arrButton = filter.querySelector(selectors.arrButton);
    this._inputArea = filter.querySelector(selectors.inputArea);
    this._filterText = filter.querySelector(selectors.filterText);
    this._allInputs = [...filter.querySelectorAll(selectors.input)];
    this._type = filter.getAttribute(attributes.filterExecuteProperty);
    this._defaultText = this._filterText.getAttribute(attributes.defaultText);
    this._allSelectedText = this._filterText.getAttribute(attributes.allSelectedText);

    this.resetButtonHandler = this.resetButtonHandler.bind(this);
    this._arrButtonHandler = this._arrButtonHandler.bind(this);
    this.executeFiltersHandler = this.executeFiltersHandler.bind(this);
  }

  setEventListeners() {
    this._arrButton.addEventListener('click', this._arrButtonHandler);
    this._inputArea.addEventListener('input', this._inputAreaHandler);
  }

  _resetInputs = () => this._allInputs.forEach((i) => (i.checked = false));

  resetButtonHandler() {
    this._resetInputs();
  }

  executeFiltersHandler() {
    this._filter.classList.remove(classes.opened);
    this._setFilterText();
  }

  _arrButtonHandler() {
    this._filter.classList.toggle(classes.opened);
  }
}
