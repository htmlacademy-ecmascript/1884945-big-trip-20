import { render } from '../framework/render.js';
import ContentListView from '../view/content-list-view.js';
import EmptyContentListMessageView from '../view/empty-content-list-message-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils.js';

export default class ContentPresenter {
  contentListComponent = new ContentListView();
  eventPresenters = new Map();

  constructor({ contentContainer, eventsModel }) {
    this.contentContainer = contentContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.offers = [...this.eventsModel.getOffers()];
    this.destinations = [...this.eventsModel.getDestinations()];

    this.renderContentBoard();
    if (!this.events.length) {
      this.renderMessage();
    } else {
      this.renderEvents();
    }
  }

  handleEventChange = (updateEvent) => {
    this.events = updateItem(this.events, updateEvent);
    this.eventPresenters.get(updateEvent.id).init(updateEvent);
  };

  renderEvent(event, offers, destinations) {
    const eventPresenter = new EventPresenter({
      contentListComponent: this.contentListComponent,
      offers: offers,
      destinations: destinations,
      onDataChange: this.handleEventChange,
    });
    eventPresenter.init(event);
    this.eventPresenters.set(event.id, eventPresenter);
  }

  renderEvents() {
    this.events.forEach((event) => {
      this.renderEvent(
        event,
        this.eventsModel.getOffersByType(event.type),
        this.eventsModel.getDestinationById(String(event.destination))
      );
    });
  }

  clearEvents() {
    this.eventPresenters.forEach((presenter) => presenter.destroy());
    this.eventPresenters.clear();
  }

  renderMessage() {
    const emptyContentListMessageComponent = new EmptyContentListMessageView();
    render(emptyContentListMessageComponent, this.contentListComponent.element);
  }

  renderContentBoard() {
    render(this.contentListComponent, this.contentContainer);
  }
}
