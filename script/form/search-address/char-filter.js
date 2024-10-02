import { attributes, selectors } from '../../utils/css-tools.js';
import { hideElem, showElem } from '../../utils/helpers.js';

export default class CharFilter {
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

  _inputHandler = (e) => {
    const input = e.target;
    if (input.tagName != 'INPUT') return;

    if (input == this._inputAll) {
      this._inputs.forEach((i) => (i.checked = false));
      input.checked = true;
      this._showAll();
    } else {
      if (this._inputAll.checked) {
        this._hideAll();
      }

      this._inputAll.checked = this._inputs.every((i) => !i.checked);
      if (this._inputAll.checked) {
        this._showAll();
      } else {
        input.checked ? showElem(this._charSections[input.value]) : hideElem(this._charSections[input.value]);
      }
    }
  };
}
