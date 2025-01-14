import SearchBase from '../search-base.js';

export default class SearchCities extends SearchBase {
  constructor(container, itemListSelector, resultListSelector, itemSelector) {
    super(container, itemListSelector, resultListSelector, itemSelector);
  }

  _getLink(elem) {
    return elem.querySelector('a');
  }
}
