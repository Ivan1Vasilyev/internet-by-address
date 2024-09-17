import { classes, selectors } from '../utils/css-tools.js';

export default class TextInput {
  constructor(container, validator) {
    this._classList = container.classList;
    this._input = container.querySelector(selectors.input);
    this._error = container.querySelector(selectors.error);
    this._reset = container.querySelector(selectors.reset);
    this._validator = validator;
  }

  setEventListeners = () => {
    this._input.addEventListener('focus', this._focusHandler);
    this._input.addEventListener('blur', this._blurHandler);
    this._input.addEventListener('input', this._inputHandler);
    this._reset.addEventListener('click', this._resetHandler);
  };

  _focusHandler = () => this._classList.add(classes.focus);

  _blurHandler = () => {
    if (!this._input.value) {
      this._classList.remove(classes.focus);
    }
  };

  _resetHandler = (e) => {
    e.stopPropagation();

    this._input.value = '';
    this._classList.remove(classes.filling);
  };

  _inputHandler = () => {
    if (!this._classList.contains(classes.filling)) {
      this._classList.add(classes.filling);
    } else if (!this._input.value) {
      this._classList.remove(classes.filling);
    }

    if (this._input.value) {
      const result = this._validator(this._input.value);
      this._input.value = result.value;
    }
  };
}
