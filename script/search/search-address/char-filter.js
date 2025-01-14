import { attributes, selectors } from '../../utils/css-tools.js';
import { hideElem, showElem } from '../../utils/helpers.js';

export default class CharFilter {
  isLocked = false;

  constructor(container) {
    this._charSections = [...container.querySelectorAll(selectors.charSection)].reduce(
      (p, i) => ({ ...p, [i.getAttribute(attributes.charSection)]: i }),
      {}
    );
    this._alphabet = container.querySelector(selectors.alphabet);
    this._allinputs = [...container.querySelectorAll(selectors.alphabetInput)];
    this._inputAll = this._allinputs.find((i) => i.value == 'all');
    this._inputs = this._allinputs.filter((i) => i != this._inputAll);
  }

  setEventListeners = () => {
    this._alphabet.addEventListener('input', this._inputHandler);
  };

  _hideAll = () => Object.values(this._charSections).forEach((i) => hideElem(i));
  _showAll = () => Object.values(this._charSections).forEach((i) => showElem(i));

  _clearInputs = () => this._inputs.forEach((i) => (i.checked = false));

  lockAlphabet = () => {
    this._isLocked = true;
    this._inputAll.checked = false;
    this._clearInputs();
  };

  unlockAlphabet = () => {
    this._showAll();
    this._isLocked = false;
    this._inputAll.checked = true;
    this._clearInputs();
  };

  _inputHandler = (e) => {
    if (this._isLocked) return;

    const input = e.target;

    if (input == this._inputAll) {
      if (this._inputs.some((i) => !i.checked)) {
        this._clearInputs();
      }
      input.checked = true;
      this._showAll();
    } else {
      if (this._inputAll.checked && this._inputs.filter((i) => i != input).some((i) => !i.checked)) {
        this._hideAll();
      }

      this._inputAll.checked = this._inputs.every((i) => !i.checked) || this._inputs.every((i) => i.checked);
      if (this._inputAll.checked) {
        this._showAll();
      } else {
        if (input.checked) {
          showElem(this._charSections[input.value]);
        } else {
          hideElem(this._charSections[input.value]);
        }
      }
    }
  };
}
