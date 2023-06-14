import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { EVENT_TYPES } from '../const.js';
import { nanoid } from 'nanoid';

const events = [
  {
    basePrice: getRandomInteger(10, 5000),
    dateFrom: '2023-06-15T15:20:13.375Z',
    dateTo: '2023-06-15T16:15:13.375Z',
    destination: getRandomInteger(1, 4),
    isFavorite: false,
    type: EVENT_TYPES.TAXI,
    offers: ['1'],
  },
  {
    basePrice: getRandomInteger(10, 5000),
    dateFrom: '2023-05-12T22:55:56.845Z',
    dateTo: '2023-05-12T23:23:13.375Z',
    destination: getRandomInteger(1, 4),
    isFavorite: true,
    type: EVENT_TYPES.TRAIN,
    offers: ['1', '2'],
  },
  {
    basePrice: getRandomInteger(10, 5000),
    dateFrom: '2023-05-11T14:20:13.375Z',
    dateTo: '2023-05-17T22:50:13.375Z',
    destination: getRandomInteger(1, 4),
    isFavorite: false,
    type: EVENT_TYPES.RESTAURANT,
    offers: ['1', '2', '3'],
  },
];

function getRandomEvent() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(events),
  };
}

export { getRandomEvent };
