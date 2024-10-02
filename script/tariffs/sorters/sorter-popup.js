import SorterBase from './sorter-base.js';
import { classes } from '../../utils/css-tools.js';

export default class SorterPopup extends SorterBase {
  constructor(sortContainer, cards, container, displayShowMore, inputHandler) {
    super(sortContainer, cards, container, displayShowMore);
    this._defaultInput = this._selectedInput;
    this._exInputHandler = inputHandler;
  }

  resetHandler = () => {
    this._inputs.forEach((i) => (i.checked = i == this._defaultInput));
    this._selectedInput = this._defaultInput;
  };

  _inputAreaHandler = (e) => {
    super._inputAreaHandler(e);
    this._exInputHandler({ key: 'sort', value: false });
  };

  executeSort = () => {
    super.executeSort();
    this._sortContainer.classList.remove(classes.opened);
  };
}
