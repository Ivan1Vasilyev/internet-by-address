class DrawMatchesService {
  _spanOpen = '<span class="color-blue">';
  _spanClose = '</span>';
  _spanAsRegex = new RegExp(`(${this._spanOpen}|${this._spanClose})`, 'g');

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

  _wrapMatch = (match) => `${this._spanOpen}${match}${this._spanClose}`;

  clearMatches = (str) => str.replace(this._spanAsRegex, '');
}

const drawMatchesService = new DrawMatchesService();
export default drawMatchesService;
