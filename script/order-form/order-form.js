import { hideElem, showElem } from '../utils/helpers.js';
import { selectors } from '../utils/css-tools.js';

export default class OrderForm {
  _phoneRegex = /\d\D?\d\D?\d\D?\d\D?\d\D?/;

  constructor(formElem, InputClass) {
    this._form = formElem.querySelector('form');
    this._defaultElem = formElem.querySelector(selectors.formStateDefault);
    this._successElem = formElem.querySelector(selectors.formStateSuccess);
    this._errorElem = formElem.querySelector(selectors.formStateError);
    this._nameInput = new InputClass(this._form.querySelector(selectors.nameInput));
    this._phoneInput = new InputClass(this._form.querySelector(selectors.phoneInput), this._phoneValidator);
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', this._submitHandler);
    this._nameInput.setEventListeners();
    this._phoneInput.setEventListeners();
  };

  resetForm = () => {
    hideElem(this._errorElem);
    hideElem(this._successElem);
    showElem(this._defaultElem);
  };

  _submitHandler = (e) => {
    e.preventDefault();
    hideElem(this._defaultElem);

    // showElem(this._successElem);
    showElem(this._errorElem);
  };

  _phoneValidator = (text) => {
    if (!/\d/.test(text[text.length - 1]) || text.length > 18) {
      return { value: text.slice(0, -1), error: false };
    }

    if (text == '+7 (') {
      return { value: '', error: false };
    }

    if (text.length == 1) {
      return { value: `+7 (${text}`, error: false };
    }

    if (
      text.length == 6 ||
      text.length == 10 ||
      text.length == 11 ||
      text.length == 14 ||
      text.length == 17 ||
      text.length == 18
    ) {
      return { value: text, error: false };
    }

    if (text.length == 7) {
      return { value: `${text}) `, error: false };
    }

    if (text.length == 12 || text.length == 15) {
      return { value: `${text}-`, error: false };
    }
  };
}
