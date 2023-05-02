import { createElement } from '../render.js';

const createContentListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ContentListView {
  getTemplate() {
    return createContentListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
