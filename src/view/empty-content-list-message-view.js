import AbstractView from '../framework/view/abstract-view.js';

const emptyListMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const createEmptyListMessageTemplate = (
  message = emptyListMessages.EVERYTHING
) => `<p class="trip-events__msg">${message}</p>`;

// Значение отображаемого текста зависит от выбранного фильтра:
//   * Everthing – 'Click New Event to create your first point'
//   * Past — 'There are no past events now';
//   * Present — 'There are no present events now';
//   * Future — 'There are no future events now'.

export default class EmptyContentListMessageView extends AbstractView {
  get template() {
    return createEmptyListMessageTemplate();
  }
}
