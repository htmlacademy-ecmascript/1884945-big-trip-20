import { render, replace } from '../framework/render.js';
import ContentListView from '../view/content-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import EmptyContentListMessageView from '../view/empty-content-list-message-view.js';
import { isEscapeKey } from '../utils.js';

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
    if (!this.events.length) {
      this.renderMessage();
    } else {
      for (let i = 0; i < this.events.length; i++) {
        this.renderEvent({
          event: this.events[i],
          offers: this.offers,
          destinations: this.destinations,
        });
      }
    }
  }

  renderEvent({ event, offers, destinations }) {
    const eventComponent = new EventView({
      event,
      offers,
      destinations,
      onEditClick: () => {
        replaceEventToEventForm();
        document.addEventListener('keydown', onEscKey);
      },
    });

    const eventFormComponent = new EventFormView({
      event,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceEventFormToEvent();
        document.removeEventListener('keydown', onEscKey);
      },
      onRollUpClick: () => {
        replaceEventFormToEvent();
        document.removeEventListener('keydown', onEscKey);
      },
    });

    function onEscKey(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEventFormToEvent();
        document.removeEventListener('keydown', onEscKey);
      }
    }

    function replaceEventToEventForm() {
      replace(eventFormComponent, eventComponent);
    }

    function replaceEventFormToEvent() {
      replace(eventComponent, eventFormComponent);
    }

    render(eventComponent, this.contentListComponent.element);
  }

  renderMessage() {
    const emptyContentListMessageComponent = new EmptyContentListMessageView();
    render(emptyContentListMessageComponent, this.contentListComponent.element);
  }
}
