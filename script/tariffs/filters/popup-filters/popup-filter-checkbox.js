import PopupFilterBase from './popup-filter-base';

export default class PopupFilterCheckbox extends PopupFilterBase {
  constructor(filter, selectedFilters, inputHandler) {
    super(filter, selectedFilters, inputHandler);
    this._inputAll = this._allInputs.find((i) => i.value == 'all');
    this._inputs = this._allInputs.filter((i) => i.name != this._inputAll.name);
  }

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

  _setFilterText = (inputs) => {
    if (inputs.length) {
      if (inputs.length == this._inputs.length) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._resultText = inputs
          .sort((a, b) => this._inputs.indexOf(a) - this._inputs.indexOf(b))
          .map((i) => i.value)
          .join(', ');

        this._filterText.textContent = this._getResultText;
      }
    } else {
      this._filterText.textContent = this._defaultText;
    }
  };

  _executeFiltersHandler = () => {
    const inputs = [...this._currentSelectedFilters];
    this._result = inputs.map((i) => i.name);

    this._setFilterText(inputs);
  };

  resetButtonHandler = () => {
    this._currentSelectedFilters.clear();
    this._result = [];
    super.resetButtonHandler();
  };
}
