export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = document.querySelector(cardSelector);
  }

  renderItems() {
    this._items.forEach(({ name, link }) => {
      const element = {
        title: name,
        link: link,
      };
      const newItem = this._renderer(element);
      this.addItem(newItem);
    });
  }

  addItem(element) {
    this._cardSelector.prepend(element);
  }
}
