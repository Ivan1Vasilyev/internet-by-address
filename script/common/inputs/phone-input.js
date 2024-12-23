import TextInput from './text-input.js';

export default class PhoneInput extends TextInput {
  _previousValue = '';

  constructor(container, resetHandler) {
    super(container, resetHandler);
  }

  _inputHandler = (e) => {
    this._phoneHandler(e);
    super._inputHandler(e);
  };

  _resetHandler = (e) => {
    super._resetHandler(e);
    this._previousValue = '';
  };

  _phoneHandler = (e) => {
    const input = e.target;
    const value = input.value.trim();

    if (value == '+') return;
    const templateStart = input.value.startsWith('8') ? `8 (` : '+7 (';
    const template = `${templateStart}012) 345-67-89`;

    const preventDeletionIndexes = [...template].reduce((p, x, i) => {
      if (i < templateStart.length || /\D/.test(x)) {
        p.push(i);
      }
      return p;
    }, []);

    const caretPosition = input.selectionEnd;
    const { inputType } = e;
    const isDeletion = inputType?.startsWith('delete');

    if (isDeletion && preventDeletionIndexes.includes(caretPosition)) {
      if (value.length < templateStart.length) {
        this._previousValue = '';
      }
      input.value = this._previousValue;
      const newCaretPosition = caretPosition + (inputType.endsWith('Forward') ? 1 : 0);

      input.selectionStart = newCaretPosition;
      input.selectionEnd = newCaretPosition;

      return;
    }

    if (value == '7' || value == '+7') {
      input.value = `+7 (`;
      return;
    }

    if (value == '8') {
      input.value = `8 (`;
      return;
    }

    const digits = value
      .replace(/^\+7|^8/, '')
      .replace(/\D/g, '')
      .slice(0, 10);

    if (!digits && input.value.length >= templateStart.length && !isDeletion) {
      input.value = input.value.slice(0, -1);
      return;
    }

    let result = '';

    for (let i = 0; i < digits.length; i++) {
      const index = template.indexOf(i, templateStart.length);
      result += template.slice(result.length, index) + digits[i];
    }

    const newCaretPosition = result == this._previousValue ? caretPosition - 1 : caretPosition;
    const diffPosition = input.value.length - caretPosition;
    this._previousValue = input.value = result;

    if (diffPosition > 0 && input.value.length <= template.length) {
      input.selectionStart = newCaretPosition;
      input.selectionEnd = newCaretPosition;
    }
  };
}
