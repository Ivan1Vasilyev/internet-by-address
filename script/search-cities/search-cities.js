import { selectors } from '../utils/css-tools';

export default class SearchCities {
  _isInitCompleted = false;
  constructor(citiesElem) {
    this._input = citiesElem.querySelector(selectors.citiesInput);
    this._cityContainer = citiesElem.querySelector(selectors.citiesContainer);
  }

  setEventListeners = () => {
    this._input.addEventListener('input', this._inputHandler);
  };

  _inputHandler = (e) => {};

  _focusHandler = (e) => {
    this._listElements = this._cityContainer.querySelectorAll(selectors.cityListEl);
  };
}
