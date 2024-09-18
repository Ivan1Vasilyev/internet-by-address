import { hideElem, showElem } from "../utils/helpers.js";
import { selectors } from "../utils/css-tools.js";

export default class OrderForm {
  _phoneRegex = /\d\D?\d\D?\d\D?\d\D?\d\D?/;

  constructor(formElem, InputClass) {
    this._form = formElem.querySelector("form");
    this._defaultElem = formElem.querySelector(selectors.formStateDefault);
    this._successElem = formElem.querySelector(selectors.formStateSuccess);
    this._errorElem = formElem.querySelector(selectors.formStateError);
    this._nameInput = new InputClass(
      this._form.querySelector(selectors.nameInput)
    );
    this._phoneInput = new InputClass(
      this._form.querySelector(selectors.phoneInput),
      this._phoneValidator
    );
  }

  setEventListeners = () => {
    this._form.addEventListener("submit", this._submitHandler);
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
    const digits = text.replace(/^\+7/, "").replace(/\D/g, "").slice(0, 10);

    const template = "+7 (012) 345-67-89";
    let result = "";
    for (let i = 0; i < digits.length; i++) {
      const index = template.indexOf(i, 2);
      result += template.slice(result.length, index) + digits[i];
    }

    return result;
  };
}
