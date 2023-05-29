import { render, RenderPosition } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';

import SortView from './view/sort-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import EventsModel from './model/events-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const tripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const contentPresenter = new ContentPresenter({
  contentContainer: tripEventsElement,
  eventsModel,
});
const filtersPresenter = new FiltersPresenter({
  contentContainer: tripControlsFiltersElement,
  eventsModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
// render(new FiltersView(), tripControlsFiltersElement);
filtersPresenter.init();
render(new SortView(), tripEventsElement);

contentPresenter.init();
