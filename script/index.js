import TextInput from './inputs/text-input.js';
import FilterExecutor from './tariffs/filters/filter-executor.js';
import FilterCheckbox from './tariffs/filters/filter-checkbox.js';
import CardRangeInput from './tariffs/range-input.js';
import ShowMore from './tariffs/show-more.js';
import Sorter from './tariffs/sorter.js';
import ResizeListener from './common/resize-listener.js';
import { attributes, selectors } from './utils/css-tools.js';
import FilterSpeed from './tariffs/filters/filter-speed.js';
import CardIcon from './tariffs/card-icon.js';
import OrderForm from './order-form/order-form.js';
import PopupWithForm from './popup/popup-with-form.js';
import PhoneInput from './inputs/phone-input.js';

const resizeHandlers = [];
const eventListeners = [];

document.querySelectorAll(selectors.textInput).forEach((input) => {
  eventListeners.push(new TextInput(input));
});

document.querySelectorAll(selectors.phoneInput).forEach((input) => {
  eventListeners.push(new PhoneInput(input));
});

document.querySelectorAll(selectors.orderForm).forEach((formElem) => {
  const form = new OrderForm(formElem);
  eventListeners.push(form);

  if (formElem.closest(selectors.popup)) {
    const popupWithForm = new PopupWithForm(document.querySelector(selectors.popupOrderForm), form.resetForm);
    eventListeners.push(popupWithForm);

    window.openOrderPopup = popupWithForm.open;
  }
});

document.querySelectorAll('[tariff-cards-container]').forEach((container) => {
  const showMoreContainer = container.querySelector(selectors.showMoreContainer);
  const cards = [...container.querySelectorAll(selectors.card)];

  const showMore = new ShowMore(showMoreContainer, cards, container);
  showMore.initShowMore(window.innerWidth);
  resizeHandlers.push(showMore.resizeHandler);

  const filterExecutor = new FilterExecutor(cards, showMore.displayShowMoreButton);

  container.querySelectorAll(selectors.filters).forEach((item) => {
    switch (item.getAttribute(attributes.filterType)) {
      case 'checkbox':
        eventListeners.push(new FilterCheckbox(item, filterExecutor.selectedFilters, filterExecutor.executeFilters));
        break;
      case 'speed':
        eventListeners.push(new FilterSpeed(item, filterExecutor.selectedFilters, filterExecutor.executeFilters));
        break;
    }
  });

  container.querySelectorAll(selectors.sortContainer).forEach((item) => {
    eventListeners.push(new Sorter(item, cards, container, showMore.displayShowMoreButton));
  });

  cards.forEach((card) => {
    eventListeners.push(new CardIcon(card));
    const rangeInput = card.querySelector(selectors.rangeInput);
    if (!rangeInput) return;
    const cardRangeInput = new CardRangeInput(rangeInput, card);
    cardRangeInput.inputHandler();
    eventListeners.push(cardRangeInput);
  });
});

document.querySelector(selectors.showFilterContainer).addEventListener('click', () => alert('open filters popup'));

document.addEventListener('DOMContentLoaded', () => {
  new ResizeListener(window, resizeHandlers).setResizeListeners();
  eventListeners.forEach((listener) => listener.setEventListeners());
});
