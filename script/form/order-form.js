import { hideElem, showElem } from '../utils/helpers.js';
import { selectors } from '../utils/css-tools.js';
import FormBase from './form-base.js';

export default class OrderForm extends FormBase {
  constructor(formElem) {
    super(formElem);
    this._defaultElem = formElem.querySelector(selectors.formStateDefault);
    this._successElem = formElem.querySelector(selectors.formStateSuccess);
    this._errorElem = formElem.querySelector(selectors.formStateError);
    this._submitButton = this._form.querySelector(selectors.submitButton);
  }

  resetForm = () => {
    hideElem(this._errorElem);
    hideElem(this._successElem);
    showElem(this._defaultElem);
  };

  disableSubmit = () => {
    this._submitButton.setAttribute('disabled', true);
  };

  enableSubmit = () => {
    this._submitButton.removeAttribute('disabled');
  };

  _submitHandler = (e) => {
    super._submitHandler(e);
    console.log(this._getData());

    hideElem(this._defaultElem);
    showElem(this._successElem);
    showElem(this._errorElem);
  };
}
