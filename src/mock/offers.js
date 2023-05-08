import { EVENT_TYPES, OFFERS } from '../const.js';
import { getRandomInteger, getRandomArrayElement } from '../utils.js';

const offers = [
  {
    type: EVENT_TYPES.TAXI,
    offers: [
      {
        id: '1',
        title: getRandomArrayElement(OFFERS),
        price: getRandomInteger(10, 5000),
      },
    ],
  },
  {
    type: EVENT_TYPES.TRAIN,
    offers: [
      {
        id: '1',
        title: getRandomArrayElement(OFFERS),
        price: getRandomInteger(10, 5000),
      },
      {
        id: '2',
        title: getRandomArrayElement(OFFERS),
        price: getRandomInteger(10, 5000),
      },
    ],
  },
  {
    type: EVENT_TYPES.RESTAURANT,
    offers: [
      {
        id: '1',
        title: getRandomArrayElement(OFFERS),
        price: getRandomInteger(10, 5000),
      },
      {
        id: '2',
        title: getRandomArrayElement(OFFERS),
        price: getRandomInteger(10, 5000),
      },
      {
        id: '3',
        title: getRandomArrayElement(OFFERS),
        price: getRandomInteger(10, 5000),
      },
    ],
  },
];

export { offers };
