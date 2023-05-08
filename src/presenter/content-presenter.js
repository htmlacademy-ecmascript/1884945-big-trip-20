import { render } from '../render.js';
import ContentListView from '../view/content-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';

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

    render(this.contentListComponent, this.contentContainer);
    render(
      new EventFormView({
        event: this.events[0],
        offers: this.offers,
        destinations: this.destinations,
      }),
      this.contentListComponent.getElement()
    );

    for (let i = 0; i < this.events.length; i++) {
      render(
        new EventView({
          event: this.events[i],
          offers: this.offers,
          destinations: this.destinations,
        }),
        this.contentListComponent.getElement()
      );
    }
  }
}
