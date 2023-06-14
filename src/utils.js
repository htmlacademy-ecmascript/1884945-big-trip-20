import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'YY/MM/DD HH:mm';
const TIME_DIFFERENCE_MIN = 'mm[m]';
const TIME_DIFFERENCE_HOUR_MIN = 'HH[h] mm[m]';
const TIME_DIFFERENCE_DAY_HOUR_MIN = 'DD[d] HH[h] mm[m]';

const MS_IN_HOUR = 3600000;
const MS_IN_DAY = 86400000;

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function humanizeEventDate(time, format) {
  return time ? dayjs(time).format(format) : '';
}

const countTimeDuration = (startDate, endDate) => {
  const difference = dayjs(endDate).diff(startDate);
  const timeDiffInMs = dayjs.duration(difference).$ms;
  let eventDuration = 0;

  switch (true) {
    case timeDiffInMs >= MS_IN_DAY:
      eventDuration = dayjs
        .duration(difference)
        .format(TIME_DIFFERENCE_DAY_HOUR_MIN);
      break;
    case timeDiffInMs >= MS_IN_HOUR:
      eventDuration = dayjs
        .duration(difference)
        .format(TIME_DIFFERENCE_HOUR_MIN);
      break;
    case timeDiffInMs < MS_IN_HOUR:
      eventDuration = dayjs.duration(difference).format(TIME_DIFFERENCE_MIN);
      break;
  }

  return eventDuration;
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEventDateExpired = (endDate) =>
  endDate && dayjs().isAfter(endDate, 'D');

const isEventDateInFuture = (startDate) =>
  startDate && dayjs().isBefore(startDate, 'D');

const isEventDateInPresent = (startDate, endDate) => {
  const startIsSameOrBeforeToday = dayjs().isSameOrAfter(
    dayjs(startDate),
    'day'
  );
  const endIsSameOrAfterToday = dayjs().isSameOrBefore(
    dayjs(endDate).format(),
    'D'
  );

  return startIsSameOrBeforeToday && endIsSameOrAfterToday;
};

const updateItem = (items, update) =>
  items.map((item) => (item.id === update.id ? update : item));

export {
  humanizeEventDate,
  countTimeDuration,
  getRandomInteger,
  getRandomArrayElement,
  FULL_DATE_FORMAT,
  DATE_FORMAT,
  TIME_FORMAT,
  isEscapeKey,
  isEventDateExpired,
  isEventDateInFuture,
  isEventDateInPresent,
  updateItem,
};
