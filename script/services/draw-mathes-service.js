class DrawMatchesService {
  _spanOpen = '<span class="color-blue">';
  _spanClose = '</span>';
  _spanAsRegex = /(<span class="color-blue">|<\/span>)/g;

  drawMatches = (searchText, targetText) => {
    searchText = searchText.trim().toLowerCase();

    const targetTextToLower = targetText.toLowerCase();

    let result = this.clearMatches(targetText);
    let start = 0;

    const indexes = [];
    while (true) {
      const startIndex = targetTextToLower.indexOf(searchText, start);
      if (startIndex < 0) break;

      indexes.push(startIndex);
      start = endIndex;
    }

    for (let i = 0; i < targetText.length; i++) {
      result = result.slice(0, startIndex) + this._wrapMatch(searchText) + result.slice(endIndex);
    }

    return result;
  };

  _wrapMatch = (match) => `${this._spanOpen}${match}${this._spanClose}`;

  clearMatches = (str) => str.replaceAll(this._spanOpen, '').replaceAll(this._spanClose, '');
}

const drawMatchesService = new DrawMatchesService();
export default drawMatchesService;
