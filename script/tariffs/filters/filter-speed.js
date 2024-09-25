import { classes, attributes } from '../../utils/css-tools.js';
import FilterBase from './filter-base.js';

export default class FilterSpeed extends FilterBase {
  _result = {
    value: 0,
    higher: false,
  };

  _under = 'до';
  _higher = 'выше';
  _isAll = false;

  constructor(filter, selectedFilters, executeFilters) {
    super(filter, selectedFilters, executeFilters);
  }

  _inputAreaHandler = (e) => {
    const input = e.target;
    if (input.tagName != 'INPUT') return;

    const values = input.value.split('+');
    const speedValue = parseInt(values[0], 10);

    const isNan = isNaN(speedValue);
    this._isAll = isNan && input.value == 'all';

    this._result.value = isNan ? 0 : speedValue;
    this._result.higher = values.length > 1 || this._isAll;

    this._executeButton.removeAttribute(attributes.disabled);
    this._resetButton.removeAttribute(attributes.disabled);
  };

  _setFilterText = () => {
    if (this._result.value !== undefined) {
      if (this._isAll) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._resultText = `${this._result.higher ? this._higher : this._under} ${this._result.value}`;
        this._filterText.textContent = this._getResultText;
        this._filter.classList.add(classes.filled);
      }
    } else {
      this._filterText.textContent = this._defaultText;
    }
  };

  _executeFiltersHandler = () => {
    this._setFilterText();
    super._executeFiltersHandler();
  };

  _resetButtonHandler = () => {
    super._resetButtonHandler();
    this._result = {};
  };
}
