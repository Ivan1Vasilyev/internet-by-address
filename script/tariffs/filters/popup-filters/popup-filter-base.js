import { selectors, classes, attributes } from "../../../utils/css-tools.js";

export default class PopupFilterBase {
  _resultText = "";

  get _getResultText() {
    if (this._additionalText) {
      this._resultText += ` ${this._additionalText}`;
    }
    return this._resultText;
  }

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
    this._allSelectedText = this._filterText.getAttribute(
      attributes.allSelectedText
    );
    this._additionalText = this._filterText.getAttribute(
      attributes.additonalText
    );
  }

  setEventListeners() {
    this._arrButton.addEventListener("click", this._arrButtonHandler);
    this._inputArea.addEventListener("input", this._inputAreaHandler);
  }

  _resetInputs = () => this._allInputs.forEach((i) => (i.checked = false));

  _arrButtonHandler = () => {
    if (this._filter.classList.contains(classes.opened)) {
      this._filter.classList.remove(classes.opened);
      this._setFilterText();
    } else {
      this._filter.classList.add(classes.opened);
    }
  };

  _inputAreaHandler() {}

  resetButtonHandler() {
    this._resetInputs();
    this._filterText.textContent = this._defaultText;
  }
}
