import { hideElem, showElem } from '../utils/helpers.js';
import { selectors } from '../utils/css-tools.js';
import PhoneInput from '../inputs/phone-input.js';
import FormBase from './form-base.js';

export default class OrderForm extends FormBase {
  constructor(formElem) {
    super(formElem);
    this._defaultElem = formElem.querySelector(selectors.formStateDefault);
    this._successElem = formElem.querySelector(selectors.formStateSuccess);
    this._errorElem = formElem.querySelector(selectors.formStateError);
    this._phoneInput = new PhoneInput(formElem.querySelector(selectors.phoneInput), this._disableSubmit);
    this._submitButton = this._form.querySelector(selectors.submitButton);
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._phoneInput.setEventListeners();
    this._form.addEventListener('change', this._changeHandler);
  };

  resetForm = () => {
    hideElem(this._errorElem);
    hideElem(this._successElem);
    showElem(this._defaultElem);
  };

  _disableSubmit = () => {
    this._submitButton.setAttribute('disabled', true);
  };

  enableSubmit = () => {
    this._submitButton.removeAttribute('disabled');
  };

  _changeHandler = (e) => {
    // console.log(e.target.value);
  };

  _submitHandler = (e) => {
    e.preventDefault();
    super._submitHandler(e);
    hideElem(this._defaultElem);

    // showElem(this._successElem);
    showElem(this._errorElem);
  };
}
