import MainForm from './form/main-form/main-form.js';
import FilterExecutor from './tariffs/filters/filter-executor.js';
import FilterCheckbox from './tariffs/filters/filter-checkbox.js';
import FilterSpeed from './tariffs/filters/filter-speed.js';
import CardRangeInput from './tariffs/range-input.js';
import ShowMore from './tariffs/show-more.js';
import SorterDesc from './tariffs/sorters/sorter-desc.js';
import TextInput from './inputs/text-input.js';
import PhoneInput from './inputs/phone-input.js';
import ResizeListener from './common/resize-listener.js';
import { attributes, selectors } from './utils/css-tools.js';
import CardIcon from './tariffs/card-icon.js';
import OrderForm from './form/order-form/order-form.js';
import PopupWithForm from './popup/popup-with-form.js';
import SearchCities from './form/search-cities/search-cities.js';
import FilterButtons from './tariffs/filters/filter-buttons.js';
import Popup from './popup/popup.js';
import SorterPopup from './tariffs/sorters/sorter-popup.js';
import CharFilter from './form/search-address/char-filter.js';

const resizeHandlers = [];
const eventListeners = [];

const mainFormElem = document.querySelector(selectors.mainForm);
eventListeners.push(new MainForm(mainFormElem));

mainFormElem.querySelectorAll(selectors.textInput).forEach((input) => {
  eventListeners.push(new TextInput(input));
});

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
  const popupWithFilters = new Popup(container.querySelector(selectors.popupFilters));
  container.querySelector(selectors.showFilterContainer).addEventListener('click', popupWithFilters.open);
  eventListeners.push(popupWithFilters);

  const cards = [...container.querySelectorAll(selectors.card)];
  const showMoreContainer = container.querySelector(selectors.showMoreContainer);

  const showMore = new ShowMore(showMoreContainer, cards, container);
  showMore.initShowMore(window.innerWidth);
  resizeHandlers.push(showMore.resizeHandler);

  const filterExecutor = new FilterExecutor(cards, showMore.displayShowMoreButton);

  container.querySelectorAll(selectors.filters).forEach((item) => {
    const filterButtons = new FilterButtons(item);
    eventListeners.push(filterButtons);
    filterButtons.exExecuteHandlers.push(filterExecutor.executeFilters);

    let filter;
    switch (item.getAttribute(attributes.filterType)) {
      case 'checkbox':
        filter = new FilterCheckbox(item, filterExecutor.selectedFilters, filterButtons.inputHandler);
        break;
      case 'speed':
        filter = new FilterSpeed(item, filterExecutor.selectedFilters, filterButtons.inputHandler);
        break;
    }

    filterButtons.exResetHandlers.push(filter.resetButtonHandler);
    filterButtons.exExecuteHandlers.push(filter.executeFiltersHandler);
    eventListeners.push(filter);
  });

  container.querySelectorAll(selectors.sortContainer).forEach((item) => {
    eventListeners.push(new SorterDesc(item, cards, container, showMore.displayShowMoreButton));
  });

  const filterButtonsInPopup = new FilterButtons(container.querySelector(selectors.popupFilters));

  filterButtonsInPopup.exExecuteHandlers.push(filterExecutor.executeFilters);

  eventListeners.push(filterButtonsInPopup);
  container.querySelectorAll(selectors.filtersPopup).forEach((item) => {
    let filter;
    switch (item.getAttribute(attributes.filterType)) {
      case 'checkbox':
        filter = new FilterCheckbox(item, filterExecutor.selectedFilters, filterButtonsInPopup.inputHandler);
        break;
      case 'speed':
        filter = new FilterSpeed(item, filterExecutor.selectedFilters, filterButtonsInPopup.inputHandler);
        break;
    }

    filterButtonsInPopup.exResetHandlers.push(filter.resetButtonHandler);
    filterButtonsInPopup.exExecuteHandlers.push(filter.executeFiltersHandler);
    eventListeners.push(filter);
  });

  container.querySelectorAll(selectors.sortPopupContainer).forEach((item) => {
    const sorter = new SorterPopup(
      item,
      cards,
      container,
      showMore.displayShowMoreButton,
      filterButtonsInPopup.inputHandler
    );

    eventListeners.push(sorter);
    filterButtonsInPopup.exResetHandlers.push(sorter.resetHandler);
    filterButtonsInPopup.exExecuteHandlers.push(sorter.executeSort);
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

eventListeners.push(new CharFilter(document.querySelector('.search-form')));

const popupWithCities = new Popup(document.querySelector(selectors.popupCities));

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
