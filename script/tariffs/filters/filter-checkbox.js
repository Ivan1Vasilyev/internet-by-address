import FilterBase from './filter-base.js';

export default class FilterCheckbox extends FilterBase {
  _currentSelectedFilters = new Set();

  constructor(filter, selectedFilters, inputHandler) {
    super(filter, selectedFilters, inputHandler);
    this._inputAll = this._allInputs.find((i) => i.value == 'all');
    this._inputs = this._allInputs.filter((i) => i != this._inputAll);
  }

  _inputAreaHandler = (e) => {
    const input = e.target;

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

    this._selectedFilters[this._type] = [...this._currentSelectedFilters].map((i) => i.name);

    this._exInputHandler({ key: this._type, value: !this._allInputs.some((i) => i.checked) });
  };

  _setFilterText = () => {
    if (this._currentSelectedFilters.size) {
      if (this._currentSelectedFilters.size == this._inputs.length) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._filterText.textContent = [...this._currentSelectedFilters]
          .sort((a, b) => this._inputs.indexOf(a) - this._inputs.indexOf(b))
          .map((i) => i.value)
          .join(', ');
      }
    } else {
      this._filterText.textContent = this._defaultText;
    }
  };

  resetButtonHandler = () => {
    this._selectedFilters[this._type] = [];
    super.resetButtonHandler();
    this._currentSelectedFilters.clear();
  };
}
