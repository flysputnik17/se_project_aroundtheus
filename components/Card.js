export class Card {
  constructor({ title, link }, cardSelector, handleImageClick) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  handleImageClick() {}

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__description-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__description-button")
      .classList.toggle("card__description-button_liked");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    const cardTitleEl = this._cardElement.querySelector(
      ".card__description-title"
    );
    const cardImageEl = this._cardElement.querySelector(".card__img");

    cardTitleEl.textContent = this._title;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._title;

    return this._cardElement;
  }
}
