export default class Section {
  constructor({ items = [], renderer }, cardElement) {
    this._items = items;
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(cardElement);
  }

  renderItems() {
    this._items.forEach((element) => {
      const newItem = this._renderer(element);
      return newItem;
    });
  }

  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}
