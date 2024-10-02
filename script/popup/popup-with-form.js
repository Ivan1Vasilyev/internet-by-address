import { selectors } from '../utils/css-tools.js';
import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  _minTop = 250;
  constructor(popup, resetForm) {
    super(popup);
    this._thanksButton = popup.querySelector(selectors.thanksButton);
    this._resetForm = resetForm;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._thanksButton.addEventListener('click', () => this.close());
  };

  close() {
    super.close();
    setTimeout(() => this._resetForm(), 500);
  }
}
