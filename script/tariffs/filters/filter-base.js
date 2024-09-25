import { selectors, classes, attributes } from '../../utils/css-tools.js';

export default class FilterBase {
  _resultText = '';

  get _getResultText() {
    if (this._additionalText) {
      this._resultText += ` ${this._additionalText}`;
    }
    return this._resultText;
  }

  constructor(filter, selectedFilters, executeFilters) {
    this._filter = filter;
    this._selectedFilters = selectedFilters;
    this._executeFilters = executeFilters;
    this._arrButton = filter.querySelector(selectors.arrButton);
    this._inputArea = filter.querySelector(selectors.inputArea);
    this._resetButton = filter.querySelector(selectors.reset);
    this._executeButton = filter.querySelector(selectors.executeButton);
    this._filterText = filter.querySelector(selectors.filterText);
    this._allInputs = [...filter.querySelectorAll(selectors.input)];
    this._type = filter.getAttribute(attributes.filterExecuteProperty);
    this._defaultText = this._filterText.getAttribute(attributes.defaultText);
    this._allSelectedText = this._filterText.getAttribute(attributes.allSelectedText);
    this._additionalText = this._filterText.getAttribute(attributes.additonalText);
  }

  setEventListeners() {
    this._arrButton.addEventListener('click', this._arrButtonHandler);
    this._resetButton.addEventListener('click', this._resetButtonHandler);
    this._executeButton.addEventListener('click', this._executeFiltersHandler);
    this._inputArea.addEventListener('input', this._inputAreaHandler);
  }

  _executeFiltersHandler() {
    this._selectedFilters[this._type] = this._result;
    this._filter.classList.remove(classes.opened);
    this._executeButton.setAttribute(attributes.disabled, true);
    this._executeFilters();
  }

  _resetInputs() {
    this._allInputs.forEach((i) => (i.checked = false));
  }

  _arrButtonHandler = () => this._filter.classList.toggle(classes.opened);

  _resetButtonHandler() {
    this._resetInputs(this._allInputs);
    this._executeButton.removeAttribute(attributes.disabled);
    this._resetButton.setAttribute(attributes.disabled, true);
  }
}
