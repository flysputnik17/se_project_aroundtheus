export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = document.querySelector(cardSelector);
  }

  renderItems() {
    this._items.forEach(({ name, link, _id }) => {
      const element = {
        name: name,
        link: link,
        cardId: _id, // Assuming _id is the cardId
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
  getItem(cardId) {
    const foundCard = this._items.find((item) => item.id === cardId);
    console.log("Found Card:", foundCard);
    return foundCard;
  }
}
