import SearchBase from '../search-base.js';

export default class SearchAddress extends SearchBase {
  constructor(container, itemListSelector, resultListSelector, itemSelector, lock, unlock) {
    super(container, itemListSelector, resultListSelector, itemSelector);
    this._lockAlphabet = lock;
    this._unlockAlphabet = unlock;
  }

  inputHandler = (e) => {
    super.inputHandler(e);
    if (e.target.value) {
      this._lockAlphabet();
    } else {
      this.resetHandler();
    }
  };

  resetHandler = () => {
    super.resetHandler();
    this._unlockAlphabet();
  };
}
