import { selectors } from '../../utils/css-tools';

export default class SearchAddress {
  _streets = [];
  _isFocusHandlerFired = false;

  constructor(container) {
    this._container = container;
  }

  focusHandler = () => {
    if (this._isFocusHandlerFired) return;
    this._isFocusHandlerFired = true;
    this._streets = [...this._container.querySelectorAll(selectors.resultItem)];
  };
}
