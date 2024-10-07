import TextInput from './text-input.js';

export default class PhoneInput extends TextInput {
  _preventDeletionIndexes = [0, 1, 2, 3, 7, 8, 12, 15];
  _previousValue = '';

  constructor(container, resetHandler) {
    super(container, resetHandler);
  }

  _inputHandler = (e) => {
    this._phoneValidator(e);
    super._inputHandler(e);
  };

  _phoneValidator = (e) => {
    const input = e.target;
    const { inputType } = e;

    if (input.value.length >= 18 && this._previousValue.length == 18 && inputType == 'insertText') {
      input.value = this._previousValue;
    } else {
      const caretPosition = input.selectionEnd;
      if (inputType?.startsWith('deleteContent') && this._preventDeletionIndexes.includes(caretPosition)) {
        input.value = this._previousValue;
        const newCaretPosition = caretPosition + (inputType.endsWith('Forward') ? 1 : 0);

        e.target.selectionStart = newCaretPosition;
        e.target.selectionEnd = newCaretPosition;
      } else {
        const digits = input.value
          .replace(/^\+?7\s/, '')
          .replace(/\D/g, '')
          .slice(0, 10);

        const template = '+7 (012) 345-67-89';
        let result = '';
        for (let i = 0; i < digits.length; i++) {
          const index = template.indexOf(i, 2);
          result += template.slice(result.length, index) + digits[i];
        }

        const diffPosition = input.value.length - caretPosition;
        const newCaretPosition = result == this._previousValue ? caretPosition - 1 : caretPosition;
        this._previousValue = input.value = result;

        if (diffPosition > 0 && input.value.length <= 18) {
          e.target.selectionStart = newCaretPosition;
          e.target.selectionEnd = newCaretPosition;
        }
      }
    }
  };
}
