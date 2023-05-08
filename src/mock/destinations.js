import { DESCRIPTIONS, PHOTO_URL } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';

const destinations = [
  {
    id: '1',
    name: 'Berlin',
    description: getRandomArrayElement(DESCRIPTIONS),
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
    ],
  },
  {
    id: '2',
    name: 'Amsterdam',
    description: getRandomArrayElement(DESCRIPTIONS),
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
    ],
  },
  {
    id: '3',
    name: 'Geneva',
    description: getRandomArrayElement(DESCRIPTIONS),
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
    ],
  },
  {
    id: '4',
    name: 'Rome',
    description: getRandomArrayElement(DESCRIPTIONS),
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `${PHOTO_URL}${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
    ],
  },
];

export { destinations };
