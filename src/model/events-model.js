import { destinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { offers } from '../mock/offers.js';

const POINTS_COUNT = 5;
export default class EventsModel {
  events = Array.from({ length: POINTS_COUNT }, getRandomEvent);
  destinations = destinations;
  offers = offers;

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    this.offersByType = this.offers.find((item) => item.type === type).offers;
    return this.offersByType;
  }

  getDestinationById(id) {
    this.destinationById = this.destinations.find(
      (destination) => destination.id === id
    );
    return this.destinationById;
  }
}
