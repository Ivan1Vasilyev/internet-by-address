import FilterExecutor from './tariffs/filters/filter-executor.js';
import FilterCheckbox from './tariffs/filters/filter-checkbox.js';
import CardRangeInput from './tariffs/range-input.js';
import ShowMore from './tariffs/show-more.js';
import Sorter from './tariffs/sorter.js';
import TextInput from './inputs/text-input.js';
import PhoneInput from './inputs/phone-input.js';
import ResizeListener from './common/resize-listener.js';
import { attributes, selectors } from './utils/css-tools.js';
import FilterSpeed from './tariffs/filters/filter-speed.js';
import CardIcon from './tariffs/card-icon.js';
import OrderForm from './form/order-form/order-form.js';
import PopupWithForm from './popup/popup-with-form.js';
import PopupWithCities from './popup/popup-with-cities.js';
import SearchCities from './form/search-cities/search-cities.js';
import PopupWithFilters from './popup/popup-with-filters.js';

const resizeHandlers = [];
const eventListeners = [];

document.querySelectorAll(selectors.orderForm).forEach((formElem) => {
  const form = new OrderForm(formElem);
  eventListeners.push(form);

  eventListeners.push(new PhoneInput(formElem.querySelector(selectors.phoneInput), form.disableSubmit));
  eventListeners.push(new TextInput(formElem.querySelector(selectors.textInput)));

  const popup = formElem.closest(selectors.popup);
  if (popup) {
    const popupWithForm = new PopupWithForm(popup, form.resetForm);
    eventListeners.push(popupWithForm);

    window.openOrderPopup = popupWithForm.open;
  }
});

document.querySelectorAll('[tariff-cards-container]').forEach((container) => {
  const popup = new PopupWithFilters(container.querySelector(selectors.popupFilters));
  container.querySelector(selectors.showFilterContainer).addEventListener('click', popup.open);
  eventListeners.push(popup);

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

const popupWithCities = new PopupWithCities(document.querySelector(selectors.popupCities));

eventListeners.push(popupWithCities);

window.openCitiesPopup = popupWithCities.open;

const searchCitiesElem = document.querySelector(selectors.popupCities);
const searchCities = new SearchCities(searchCitiesElem);
eventListeners.push(searchCities);
eventListeners.push(
  new TextInput(
    searchCitiesElem.querySelector(selectors.textInput),
    searchCities.resetTextInputHandler,
    searchCities.inputHandler
  )
);

document.addEventListener('DOMContentLoaded', () => {
  new ResizeListener(window, resizeHandlers).setResizeListeners();
  eventListeners.forEach((listener) => listener.setEventListeners());
});
