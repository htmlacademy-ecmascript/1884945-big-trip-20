import { render } from '../render.js';
import ContentListView from '../view/content-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';

export default class ContentPresenter {
  contentListComponent = new ContentListView();

  constructor({ contentContainer }) {
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.contentListComponent, this.contentContainer);
    render(new EventFormView(), this.contentListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.contentListComponent.getElement());
    }
  }
}
