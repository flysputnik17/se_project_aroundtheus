export class Card {
  constructor({ title, link }, cardSelector, handleImageClick) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__description-button_liked");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }

  //function to cloneing the card templete
  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  ///////getView is a public function that returns a card element///////////////
  getView() {
    this._cardElement = this._getElement(); //calling this function to clone the card and save it on the cardElement
    this._cardTitleEl = this._cardElement.querySelector(
      ".card__description-title"
    );
    this._cardImageEl = this._cardElement.querySelector(".card__img");
    this._likeButton = this._cardElement.querySelector(
      ".card__description-button"
    );
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardTitleEl.textContent = this._title; //puting the title to the text content of the card that i resiving
    this._cardImageEl.src = this._link; //puting the link to src of the card to render the img
    this._cardImageEl.alt = this._title; //coping the title to put it as an alt of the img

    this._setEventListeners(); //calling the eventListeners

    return this._cardElement; ///returning the card element
  }
}
