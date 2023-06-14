import { render, replace, remove } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { isEscapeKey } from '../utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class EventPresenter {
  eventComponent = null;
  eventFormComponent = null;

  mode = Mode.DEFAULT;

  constructor({
    contentListComponent,
    offers,
    destinations,
    onDataChange,
    onModeChange,
  }) {
    this.contentListComponent = contentListComponent;
    this.offers = offers;
    this.destinations = destinations;
    this.handleDataChange = onDataChange;
    this.handleModeChange = onModeChange;
  }

  init(event) {
    this.event = event;
    const prevEventComponent = this.eventComponent;
    const prevEventFormComponent = this.eventFormComponent;

    this.eventComponent = new EventView({
      event: this.event,
      offers: this.offers,
      destinations: this.destinations,
      onEditClick: () => {
        this.replaceEventToEventForm();
      },
      onFavoriteClick: this.handleFavoriteClick,
    });

    this.eventFormComponent = new EventFormView({
      event: this.event,
      offers: this.offers,
      destinations: this.destinations,
      onFormSubmit: () => {
        this.replaceEventFormToEvent();
      },
      onRollUpClick: () => {
        this.replaceEventFormToEvent();
      },
    });

    if (prevEventComponent === null || prevEventFormComponent === null) {
      render(this.eventComponent, this.contentListComponent.element);
      return;
    }

    if (this.mode === Mode.DEFAULT) {
      replace(this.eventComponent, prevEventComponent);
    }

    if (this.mode === Mode.DEFAULT) {
      replace(this.pointComponent, prevEventFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEventFormComponent);
  }

  destroy() {
    remove(this.eventComponent);
    remove(this.eventFormComponent);
  }

  resetView() {
    if (this.mode !== Mode.DEFAULT) {
      this.replaceEventFormToEvent();
    }
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
    this.handleModeChange();
    this.mode = Mode.EDITING;
  }

  replaceEventFormToEvent() {
    replace(this.eventComponent, this.eventFormComponent);
    document.removeEventListener('keydown', this.onEscKey);
    this.mode = Mode.DEFAULT;
  }

  handleFavoriteClick = () => {
    this.handleDataChange({
      ...this.event,
      isFavorite: !this.event.isFavorite,
    });
  };
}
