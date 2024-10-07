import FilterBase from './filter-base.js';

export default class FilterSpeed extends FilterBase {
  _isAll = false;

  constructor(filter, selectedFilters, inputHandler) {
    super(filter, selectedFilters, inputHandler);
  }

  _inputAreaHandler = (e) => {
    const input = e.target;

    const values = input.value.split('+');
    const speedValue = parseInt(values[0], 10);

    const isNan = isNaN(speedValue);
    this._isAll = isNan && input.value == 'all';

    const value = isNan ? 0 : speedValue;
    const higher = values.length > 1 || this._isAll;

    this._selectedFilters[this._type] = { value, higher };

    this._exInputHandler({ key: this._type, value: false });
  };

  _setFilterText = () => {
    const { higher, value } = this._selectedFilters[this._type];
    if (value !== undefined) {
      if (this._isAll) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._filterText.textContent = `${higher ? 'до' : 'выше'} ${value} ${'Мбит/сек'}`;
      }
    } else {
      this._filterText.textContent = this._defaultText;
    }
  };

  resetButtonHandler = () => {
    this._selectedFilters[this._type] = {};
    super.resetButtonHandler();
  };
}
