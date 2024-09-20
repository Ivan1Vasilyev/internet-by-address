import TextInput from '../inputs/text-input.js';
import { selectors } from '../utils/css-tools.js';

export default class FormBase {
  constructor(formElem) {
    this._form = formElem.querySelector('form');
    this._inputs = [...this._form.querySelectorAll('input')];
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    this._form.querySelectorAll(selectors.textInput).forEach((input) => {
      new TextInput(input, this._resetTextInputHandler).setEventListeners();
    });
  }

  _getData = () => this._inputs.reduce((p, i) => ({ ...p, [i.name]: i.value }), {});

  _submitHandler(e) {
    e.preventDefault();

    console.log(this._getData());
  }
}
