import { classes, selectors } from '../../utils/css-tools.js';

export default class TextInput {
  constructor(container, resetHandler, inputHandler, focusHandler) {
    this._classList = container.classList;
    this._exResetHandler = resetHandler;
    this._exInputHandler = inputHandler;
    this._exFocusHandler = focusHandler;
    this._input = container.querySelector(selectors.input);
    this._error = container.querySelector(selectors.error);
    this._reset = container.querySelector(selectors.reset);
  }

  setEventListeners = () => {
    this._input.addEventListener('focus', this._focusHandler);
    this._input.addEventListener('blur', this._blurHandler);
    this._input.addEventListener('input', this._inputHandler.bind(this));
    this._reset.addEventListener('click', this._resetHandler);
  };

  _focusHandler = () => {
    this._classList.add(classes.focus);
    if (this._exFocusHandler) {
      this._exFocusHandler();
    }
  };

  _blurHandler = (e) => {
    if (!e.target.value) {
      this._classList.remove(classes.focus);
    }
  };

  _resetHandler = (e) => {
    e.stopPropagation();

    if (this._exResetHandler) {
      this._exResetHandler();
    }

    this._input.value = '';
    this._classList.remove(classes.filling);
  };

  _inputHandler(e) {
    if (e.target.value) {
      this._classList.add(classes.filling);
    } else {
      this._classList.remove(classes.filling);
    }

    if (this._exInputHandler) {
      this._exInputHandler(e);
    }
  }
}
