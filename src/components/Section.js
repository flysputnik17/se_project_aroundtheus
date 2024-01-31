export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = document.querySelector(cardSelector);
  }

  renderItems() {
    this._items.forEach(({ name, link }) => {
      const element = {
        name: name,
        link: link,
      };
      const newItem = this._renderer(element);
      setTimeout(() => {
        this.addItem(newItem);
      }, 0);
    });
  }

  addItem(element) {
    this._cardSelector.prepend(element);
  }
}
