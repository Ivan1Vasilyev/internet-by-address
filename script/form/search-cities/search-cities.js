import { attributes, classes, selectors } from '../../utils/css-tools.js';
import { keyboardDict } from '../../utils/constants.js';
import FormBase from '../form-base.js';
import { hideElem, showElem } from '../../utils/helpers.js';
import drawMatchesService from '../../services/draw-mathes-service.js';

export default class SearchCities extends FormBase {
  _isInitCompleted = false;
  _cities = [];

  constructor(citiesElem) {
    super(citiesElem);
    this._cityContainer = citiesElem.querySelector(selectors.citiesContainer);
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('focus', this._focusHandler, { once: true, capture: true });
  };

  inputHandler = (e) => {
    const { value } = e.target;

    if (value) {
      this._cityContainer.classList.add(classes.filling);
      let searchValue = '';

      if (/[A-z]/.test(value)) {
        for (let i = 0; i < value.length; i++) {
          searchValue += keyboardDict[value[i]] || value[i];
        }
      } else {
        searchValue = value;
      }

      this._executeSearch(searchValue);
    } else {
      this.resetTextInputHandler();
    }
  };

  resetTextInputHandler = () => {
    this._cityContainer.classList.remove(classes.filling);
    this._setDefaultState();
  };

  _executeSearch = (searchValue) => {
    this._cities.forEach((i) => {
      const link = i.querySelector('a');
      if (i.getAttribute(attributes.find).includes(searchValue.toLowerCase())) {
        link.innerHTML = drawMatchesService.drawMatches(searchValue, link.textContent);
        showElem(i);
      } else {
        link.textContent = drawMatchesService.clearMatches(link.innerHTML);
        hideElem(i);
      }
    });
  };

  _setDefaultState = () => {
    this._cities.forEach((i) => {
      const link = i.querySelector('a');
      link.textContent = drawMatchesService.clearMatches(link.innerHTML);
      showElem(i);
    });
  };

  _focusHandler = () => {
    this._cities = [...this._cityContainer.querySelectorAll(selectors.cityListLink)];
  };
}
