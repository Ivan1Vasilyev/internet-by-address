import { classes, attributes } from "../../../utils/css-tools.js";
import FilterBase from "./filter-base.js";

export default class FilterCheckbox extends FilterBase {
  _currentSelectedFilters = new Set();

  constructor(filter, selectedFilters, executeFilters) {
    super(filter, selectedFilters, executeFilters);
    this._inputAll = this._allInputs.find((i) => i.value == "all");
    this._inputs = this._allInputs.filter((i) => i.name != this._inputAll.name);
  }

  _inputAreaHandler = (e) => {
    const input = e.target;
    if (input.tagName != "INPUT") return;

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

    this._selectedFilters[this._type] = [...this._currentSelectedFilters].map(
      (i) => i.name
    );

    if (this._allInputs.some((i) => i.checked)) {
      this._resetButton.removeAttribute(attributes.disabled);
    } else {
      this._resetButton.setAttribute(attributes.disabled, true);
    }
  };

  _setFilterText = () => {
    if (this._currentSelectedFilters.size) {
      if (this._currentSelectedFilters.size == this._inputs.length) {
        this._filterText.textContent = this._allSelectedText;
      } else {
        this._resultText = [...this._currentSelectedFilters]
          .sort((a, b) => this._inputs.indexOf(a) - this._inputs.indexOf(b))
          .map((i) => i.value)
          .join(", ");

        this._filterText.textContent = this._getResultText;
      }
    } else {
      this._filterText.textContent = this._defaultText;
    }
  };

  _resetButtonHandler = () => {
    super._resetButtonHandler();
    this._selectedFilters[this._type] = [];
    this._currentSelectedFilters.clear();
  };
}
