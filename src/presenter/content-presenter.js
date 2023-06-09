import { render } from '../framework/render.js';
import ContentListView from '../view/content-list-view.js';
import EmptyContentListMessageView from '../view/empty-content-list-message-view.js';
import EventPresenter from './event-presenter.js';

export default class ContentPresenter {
  contentListComponent = new ContentListView();

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

  renderEvent({ event, offers, destinations }) {
    const eventPresenter = new EventPresenter({
      contentListComponent: this.contentListComponent,
    });
    eventPresenter.init({ event, offers, destinations });
  }

  renderEvents() {
    for (const event of this.events) {
      this.renderEvent({
        event: event,
        offers: this.offers,
        destinations: this.destinations,
      });
    }
  }

  renderMessage() {
    const emptyContentListMessageComponent = new EmptyContentListMessageView();
    render(emptyContentListMessageComponent, this.contentListComponent.element);
  }

  renderContentBoard() {
    render(this.contentListComponent, this.contentContainer);
  }
}
