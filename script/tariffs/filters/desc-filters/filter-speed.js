import { classes, attributes } from '../../../utils/css-tools.js';
import FilterBase from './filter-base.js';

export default class FilterSpeed extends FilterBase {
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

    const value = isNan ? 0 : speedValue;
    const higher = values.length > 1 || this._isAll;

    this._selectedFilters[this._type] = { value, higher };

    this._executeButton.removeAttribute(attributes.disabled);
    this._resetButton.removeAttribute(attributes.disabled);
  };

  _setFilterText = () => {
    const { higher, value } = this._selectedFilters[this._type];
    if (value !== undefined) {
      if (this._isAll) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._resultText = `${higher ? higher : this._under} ${value}`;
        this._filterText.textContent = this._getResultText;
      }
    } else {
      this._filterText.textContent = this._defaultText;
    }
  };

  _resetButtonHandler = () => {
    super._resetButtonHandler();
    this._selectedFilters[this._type] = {};
  };
}
