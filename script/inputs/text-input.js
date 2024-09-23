import { classes, selectors } from '../utils/css-tools.js';

export default class TextInput {
  constructor(container, resetHandler, inputHandler) {
    this._classList = container.classList;
    this._externalResetHandler = resetHandler;
    this._externalInputHandler = inputHandler;
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

  _focusHandler = () => this._classList.add(classes.focus);

  _blurHandler = (e) => {
    if (!e.target.value) {
      this._classList.remove(classes.focus);
    }
  };

  _resetHandler = (e) => {
    e.stopPropagation();

    if (this._externalResetHandler) {
      this._externalResetHandler();
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

    if (this._externalInputHandler) {
      this._externalInputHandler(e);
    }
  }
}
