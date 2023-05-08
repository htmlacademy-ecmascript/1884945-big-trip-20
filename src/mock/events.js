import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { EVENT_TYPES } from '../const.js';

const events = [
  {
    id: '1',
    basePrice: getRandomInteger(10, 5000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomInteger(1, 4),
    isFavorite: false,
    type: EVENT_TYPES.TAXI,
    offers: ['1'],
  },
  {
    id: '2',
    basePrice: getRandomInteger(10, 5000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomInteger(1, 4),
    isFavorite: true,
    type: EVENT_TYPES.TRAIN,
    offers: ['1', '2'],
  },
  {
    id: '2',
    basePrice: getRandomInteger(10, 5000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomInteger(1, 4),
    isFavorite: false,
    type: EVENT_TYPES.RESTAURANT,
    offers: ['1', '2', '3'],
  },
];

const getRandomEvent = () => getRandomArrayElement(events);

export { getRandomEvent };
