import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import EventsModel from './model/events-model.js';

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

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFiltersElement);
render(new SortView(), tripEventsElement);

contentPresenter.init();
