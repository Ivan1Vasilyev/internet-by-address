import { classes, selectors } from '../utils/css-tools.js';
import { keyboardDict } from '../utils/constants.js';
import FormBase from '../order-form/form-base.js';
import { hideElem, showElem } from '../utils/helpers.js';

export default class SearchCities extends FormBase {
  _isInitCompleted = false;
  _cities = [];

  constructor(citiesElem) {
    super(citiesElem);
    this._input = citiesElem.querySelector(selectors.citiesInput);
    this._cityContainer = citiesElem.querySelector(selectors.citiesContainer);
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._input.addEventListener('input', this._inputHandler);
    this._input.addEventListener('focus', this._focusHandler);
  };

  _inputHandler = (e) => {
    const { value } = e.target;

    if (value) {
      this._cityContainer.classList.add(classes.filling);
    } else {
      this._resetTextInputHandler();
    }

    let searchValue = '';

    if (/[A-z]/.test(value)) {
      for (let i = 0; i < value.length; i++) {
        searchValue += keyboardDict[value[i]] || value[i];
      }
    } else {
      searchValue = value;
    }

    this._executeSearch(searchValue.trim().toLowerCase());

    console.log(searchValue);
  };

  _resetTextInputHandler = () => {
    this._cityContainer.classList.remove(classes.filling);
    this._cities.forEach((city) => showElem(city));
  };

  _executeSearch = (searchValue) => {
    this._cities.forEach((i) => {
      if (i.getAttribute('data-find').includes(searchValue)) {
        showElem(i);
      } else {
        hideElem(i);
      }
    });
  };

  _drawMatch = (searcValue, city) => {};

  _focusHandler = (e) => {
    if (this._isInitCompleted) {
      this._input.removeEventListener('focus', this._focusHandler);
      return;
    }

    this._cities = [...this._cityContainer.querySelectorAll(selectors.cityListLink)];

    this._isInitCompleted = true;
  };
}
