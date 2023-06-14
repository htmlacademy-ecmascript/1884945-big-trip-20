import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeEventDate,
  countTimeDuration,
  DATE_FORMAT,
  TIME_FORMAT,
} from '../utils.js';

const createEventTemplate = (event, offersByType, destinationById) => {
  const { basePrice, dateFrom, dateTo, offers, type, isFavorite } = event;

  const date = humanizeEventDate(dateFrom, DATE_FORMAT);
  const timeFrom = humanizeEventDate(dateFrom, TIME_FORMAT);
  const timeTo = humanizeEventDate(dateTo, TIME_FORMAT);
  const timeDuration = countTimeDuration(dateFrom, dateTo);

  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  const findChosenOffers = (chosenOffers) =>
    offersByType.filter((item) => chosenOffers.includes(item.id));

  function createOfferTemplate() {
    return findChosenOffers(offers)
      .map(
        (item) => `
      <li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>
    `
      )
      .join('');
  }

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationById.name}
        </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${timeDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOfferTemplate()}
        </ul>
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};
export default class EventView extends AbstractView {
  constructor({ event, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
    this.handleEditClick = onEditClick;
    this.handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.favoriteClickHandler);
  }

  get template() {
    return createEventTemplate(this.event, this.offers, this.destinations);
  }

  editClickHandler = (evt) => {
    evt.preventDefault();
    this.handleEditClick();
  };

  favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.handleFavoriteClick();
  };
}
