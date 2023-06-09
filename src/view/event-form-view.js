import AbstractView from '../framework/view/abstract-view.js';
import { EVENT_TYPES } from '../const';
import { humanizeEventDate, FULL_DATE_FORMAT } from '../utils.js';

const createEventFormTemplate = (event, offersByType, destinationById) => {
  const { basePrice, dateFrom, dateTo, offers, type } = event;
  const timeFrom = humanizeEventDate(dateFrom, FULL_DATE_FORMAT);
  const timeTo = humanizeEventDate(dateTo, FULL_DATE_FORMAT);

  // const findEventDestination = (randomDestination) =>
  //   allDestinations.find((item) => String(randomDestination).includes(item.id));

  // const eventDestination = findEventDestination(destination);

  const createTypesChooserTemplate = (eventTypes) =>
    Object.values(eventTypes)
      .map(
        (item) => `
          <div class="event__type-item">
            <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}">
            <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
          </div>`
      )
      .join('');

  const createOffersTemplate = () => {
    offersByType
      .map((offer) => {
        const checked = offers.includes(offer.id) ? 'checked' : '';

        return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${checked}>
          <label class="event__offer-label" for="event-offer-${offer.title}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
      })
      .join('');
  };

  const createDestinationDescriptionTemplate = (myDestination) => {
    const { pictures, description } = myDestination;
    const destinationPictures = pictures
      .map(
        (picture) => `
      <img class="event__photo" src="${picture.src}" alt="${picture.alt}">
    `
      )
      .join('');

    return `
    <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationPictures}
        </div>
      </div>
    `;
  };

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${createTypesChooserTemplate(EVENT_TYPES)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destinationById.name}"
              list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${createOffersTemplate(type)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${createDestinationDescriptionTemplate(destinationById)}
          </section>
          </section>
          </form>
        </li>
      `;
};

export default class EventFormView extends AbstractView {
  constructor({ event, offers, destinations, onFormSubmit, onRollUpClick }) {
    super();
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
    this.handleFormSubmit = onFormSubmit;
    this.handleRollUpClick = onRollUpClick;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.rollUpButtonClick);
  }

  get template() {
    return createEventFormTemplate(this.event, this.offers, this.destinations);
  }

  formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.handleFormSubmit();
  };

  rollUpButtonClick = (evt) => {
    evt.preventDefault();
    this.handleRollUpClick();
  };
}
