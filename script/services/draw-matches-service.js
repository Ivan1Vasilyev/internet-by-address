class DrawMatchesService {
  _spanTagOpen = '<span class="color-blue">';
  _spanTagClose = '</span>';

  drawMatches = (search, source) => {
    search = search.trim();
    const searchToLower = search.toLowerCase();
    const sourceToLower = source.toLowerCase();

    let result = '';
    let startIndex = 0;
    let lastIndex = 0;
    while (true) {
      const index = sourceToLower.indexOf(searchToLower, startIndex);
      if (index < 0) break;

      lastIndex = index + search.length;
      result += source.slice(startIndex, index) + this._wrapMatch(source.slice(index, lastIndex));
      startIndex = lastIndex;
    }

    result += source.slice(lastIndex);

    return result;
  };

  getFirstMatchIndex = (elem) => elem.innerHTML.indexOf(this._spanTagOpen);

  _wrapMatch = (match) => `${this._spanTagOpen}${match}${this._spanTagClose}`;
}

const drawMatchesService = new DrawMatchesService();
export default drawMatchesService;
