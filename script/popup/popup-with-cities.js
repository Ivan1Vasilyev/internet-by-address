import { selectors } from '../utils/css-tools.js';
import Popup from './popup.js';

export default class PopupWithCities extends Popup {
  _minTop = 500;
  constructor(popup) {
    super(popup);
  }

  _isOutOfCitiesContainer = (e) => e.target.closest(selectors.citiesContainer) === null;

  _preventDefault(e) {
    if (this._isOutOfCitiesContainer(e)) e.preventDefault();
  }

  _touchMoveHandler(e) {
    if (this._isOutOfCitiesContainer(e)) super._touchMoveHandler(e);
  }

  _touchStartHandler = (e) => {
    if (this._isOutOfCitiesContainer(e)) super._touchStartHandler(e);
  };
}
