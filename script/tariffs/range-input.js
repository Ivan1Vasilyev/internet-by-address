import { attributes, selectors, classes } from '../utils/css-tools.js';
import { hideElem, showElem, getWordEnding } from '../utils/helpers.js';

export default class CardRangeInput {
  constructor(input, card) {
    this._input = input;
    this._speeds = [...card.querySelectorAll(selectors.speeds)];
    this._speedElem = card.querySelector(selectors.speed);
    this._price = card.querySelector(selectors.price);
    this._priceOld = card.querySelector(selectors.oldPrice);
    this._firstMonth = card.querySelector(selectors.firstMonth);
    this._promoInfo = card.querySelector(selectors.promoInfo);
    this._promoPercent = this._promoInfo.querySelector(selectors.promoPercent);
    this._promoLength = this._promoInfo.querySelector(selectors.promoLength);
    this._monthWord = this._promoInfo.querySelector(selectors.monthWord);
    this._options = JSON.parse(this._input.getAttribute(attributes.options));
  }

  inputHandler = () => {
    const { value } = this._input;
    const option = this._options[value];
    const [currentPrice, oldPrice] = this._getPrices(option);
    this._priceOld.textContent = oldPrice;
    this._price.textContent = currentPrice;

    if (option.first_month) {
      showElem(this._firstMonth);
    } else {
      hideElem(this._firstMonth);
    }

    if (option.promo_duration) {
      this._promoLength.textContent = option.promo_duration;
      const percent = option.promo_percentage;

      if (percent) {
        this._promoPercent.textContent = `-${percent}%`;
      } else {
        this._promoPercent.textContent = 'cкидка';
      }

      this._monthWord.textContent = getWordEnding(option.promo_duration, 'месяц', 'месяца', 'месяцев');
      showElem(this._promoInfo);
    } else {
      hideElem(this._promoInfo);
    }
    this._speedElem.textContent = this._speeds[value].textContent;
    this._speeds[value].classList.add(classes.active);

    this._setRangeInput();
  };

  setEventListeners = () => {
    this._input.addEventListener('input', this.inputHandler);
  };

  _setRangeInput = () => {
    const { min, max, value } = this._input;
    const percentage = ((value - min) * 100) / (max - min);

    this._input.style.backgroundSize = percentage + '% 100%';
  };

  _getPrices = (option) => {
    const { price, discount_price } = option;
    const currentPrice = discount_price ?? price ?? 0;
    const oldPrice = discount_price ? price : null;
    return [currentPrice, oldPrice];
  };
}
