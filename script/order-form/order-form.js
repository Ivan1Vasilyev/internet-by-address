import { hideElem, showElem } from '../utils/helpers.js';
import { selectors } from '../utils/css-tools.js';

export default class OrderForm {
  constructor(formElem) {
    this._form = formElem.querySelector('form');
    this._defaultElem = formElem.querySelector(selectors.formStateDefault);
    this._successElem = formElem.querySelector(selectors.formStateSuccess);
    this._errorElem = formElem.querySelector(selectors.formStateError);
    this._inputs = [...this._form.querySelectorAll('input')];
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', this._submitHandler);
  };

  resetForm = () => {
    hideElem(this._errorElem);
    hideElem(this._successElem);
    showElem(this._defaultElem);
  };

  _getData = () => {
    return this._inputs.reduce((p, i) => {
      p[i.name] = i.value;
      return p;
    }, {});
  };

  _submitHandler = (e) => {
    e.preventDefault();
    hideElem(this._defaultElem);

    // showElem(this._successElem);
    showElem(this._errorElem);

    console.log(this._getData());
  };
}
