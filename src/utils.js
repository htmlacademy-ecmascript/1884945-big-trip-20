import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

dayjs.extend(utc);
dayjs.extend(duration);

const humanizeEventDate = (date) =>
  date ? dayjs(date).utc().format(DATE_FORMAT) : '';

const humanizeEventTime = (time) =>
  time ? dayjs(time).utc().format(TIME_FORMAT) : '';

const countTimeDuration = (startDate, endDate) => {
  const difference = dayjs(endDate).diff(startDate);
  return dayjs.duration(difference).format('HH[h] mm[m]');
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export {
  humanizeEventDate,
  humanizeEventTime,
  countTimeDuration,
  getRandomInteger,
  getRandomArrayElement,
};
