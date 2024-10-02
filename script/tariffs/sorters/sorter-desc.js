import SorterBase from './sorter-base.js';

export default class SorterDesc extends SorterBase {
  constructor(sortContainer, cards, container, displayShowMore) {
    super(sortContainer, cards, container, displayShowMore);
  }

  _inputAreaHandler = (e) => {
    super._inputAreaHandler(e);
    this.executeSort();
  };
}
