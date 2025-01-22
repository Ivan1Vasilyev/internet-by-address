export default class FormBase {
  constructor(formElem) {
    this._form = formElem.querySelector('form');
    this._inputs = [...this._form.querySelectorAll('input')];
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
  }

  _getData = () => this._inputs.reduce((p, i) => ({ ...p, [i.name]: i.value }), {});

  _submitHandler(e) {
    e.preventDefault();
  }
}
