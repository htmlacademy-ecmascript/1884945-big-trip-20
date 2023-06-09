import { render, replace } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { isEscapeKey } from '../utils.js';

export default class EventPresenter {
  constructor({ contentListComponent }) {
    this.contentListComponent = contentListComponent;
  }

  init({ event, offers, destinations }) {
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;

    this.eventComponent = new EventView({
      event: this.event,
      offers: this.offers,
      destinations: this.destinations,
      onEditClick: () => {
        this.replaceEventToEventForm();
      },
    });

    this.eventFormComponent = new EventFormView({
      event,
      offers,
      destinations,
      onFormSubmit: () => {
        this.replaceEventFormToEvent();
      },
      onRollUpClick: () => {
        this.replaceEventFormToEvent();
      },
    });

    render(this.eventComponent, this.contentListComponent.element);
  }

  onEscKey = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.replaceEventFormToEvent();
    }
  };

  replaceEventToEventForm() {
    replace(this.eventFormComponent, this.eventComponent);
    document.addEventListener('keydown', this.onEscKey);
  }

  replaceEventFormToEvent() {
    replace(this.eventComponent, this.eventFormComponent);
    document.removeEventListener('keydown', this.onEscKey);
  }
}
