import { destinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { offers } from '../mock/offers.js';

const POINTS_COUNT = 10;
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
}
