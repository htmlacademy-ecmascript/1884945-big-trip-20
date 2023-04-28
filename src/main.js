import { render, RenderPosition } from './render.js';
import NewTripInfoView from './view/trip-info-view.js';
import NewFiltersView from './view/filters-view.js';
import NewSortView from './view/sort-view.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const tripEventsElement = document.querySelector('.trip-events');

render(new NewTripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new NewFiltersView(), tripControlsFiltersElement);
render(new NewSortView(), tripEventsElement);
