import { classes, attributes } from '../../utils/css-tools.js';
import FilterBase from './filter-base.js';

export default class FilterCheckbox extends FilterBase {
  _currentSelectedFilters = new Set();
  _result = [];

  constructor(filter, selectedFilters, executeFilters) {
    super(filter, selectedFilters, executeFilters);
    this._inputAll = this._allInputs.find((i) => i.value == 'all');
    this._inputs = this._allInputs.filter((i) => i.name != this._inputAll.name);
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._executeButton.addEventListener('click', this._executeFiltersHandler);
    this._inputArea.addEventListener('input', this._inputAreaHandler);
  };

  _inputAreaHandler = (e) => {
    const input = e.target;
    if (input.tagName != 'INPUT') return;

    if (input == this._inputAll) {
      if (input.checked) {
        this._inputs.forEach((i) => {
          this._currentSelectedFilters.add(i);
          i.checked = true;
        });
      } else {
        this._currentSelectedFilters.clear();
        this._resetInputs();
      }
    } else {
      if (input.checked) {
        this._currentSelectedFilters.add(input);
        if (this._inputs.every((i) => i.checked)) {
          this._inputAll.checked = true;
        }
      } else {
        this._inputAll.checked = false;
        this._currentSelectedFilters.delete(input);
      }
    }

    this._executeButton.removeAttribute(attributes.disabled);

    if (this._allInputs.some((i) => i.checked)) {
      this._resetButton.removeAttribute(attributes.disabled);
    } else {
      this._resetButton.setAttribute(attributes.disabled, true);
    }
  };

  _executeFiltersHandler = () => {
    const inputs = [...this._currentSelectedFilters];
    this._result = inputs.map((i) => i.name);

    if (inputs.length > 0) {
      if (inputs.length == this._inputs.length) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._resultText = inputs
          .sort((a, b) => this._inputs.indexOf(a) - this._inputs.indexOf(b))
          .map((i) => i.value)
          .join(', ');

        this._filterText.textContent = this._getResultText;
      }

      this._filter.classList.add(classes.filled);
    } else {
      this._filterText.textContent = this._defaultText;
    }
    super._executeFiltersHandler();
  };

  _resetButtonHandler = () => {
    super._resetButtonHandler();
    this._currentSelectedFilters.clear();
    this._result = [];
  };
}
