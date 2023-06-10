import { render, replace, remove } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { isEscapeKey } from '../utils.js';

export default class EventPresenter {
  eventComponent = null;
  eventFormComponent = null;

  constructor({ contentListComponent }) {
    this.contentListComponent = contentListComponent;
  }

  init({ event, offers, destinations }) {
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;

    const prevEventComponent = this.eventComponent;
    const prevEventFormComponent = this.eventFormComponent;

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

    if (prevEventComponent === null || prevEventFormComponent === null) {
      render(this.eventComponent, this.contentListComponent.element);
    }

    if (
      this.contentListComponent.element.contains(prevEventComponent?.element)
    ) {
      replace(this.pointComponent, prevEventComponent);
    }

    if (
      this.contentListComponent.element.contains(
        prevEventFormComponent?.element
      )
    ) {
      replace(this.pointComponent, prevEventFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEventFormComponent);
  }

  destroy() {
    remove(this.eventComponent);
    remove(this.eventFormComponent);
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
