import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { FILTER_TYPES } from '../const';
import {
  isEventDateExpired,
  isEventDateInFuture,
  isEventDateInPresent,
} from '../utils.js';

export default class FiltersPresenter {
  constructor({ contentContainer, eventsModel }) {
    this.contentContainer = contentContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    const filter = {
      [FILTER_TYPES.EVERYTHING]: (events) => [...events],
      [FILTER_TYPES.FUTURE]: (events) =>
        events.filter((event) => isEventDateInFuture(event.dateFrom)),
      [FILTER_TYPES.PRESENT]: (events) =>
        events.filter((event) =>
          isEventDateInPresent(event.dateFrom, event.dateTo)
        ),
      [FILTER_TYPES.PAST]: (events) =>
        events.filter((event) => isEventDateExpired(event.dateTo)),
    };

    const generateFilter = (routeEvents) =>
      Object.entries(filter).map(([filterType, filterEvents]) => ({
        type: filterType,
        hasEvents: filterEvents(routeEvents).length > 0,
      }));
    const filters = generateFilter(this.eventsModel.events);

    render(new FiltersView({ filters }), this.contentContainer);
  }
}
