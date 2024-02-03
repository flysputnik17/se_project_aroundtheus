export class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleOpenPopup
  ) {
    this.title = name;
    this.link = link;
    this.cardId = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick; //passing the imgClick funtion form undex,js
    this._handleOpenPopup = handleOpenPopup; //passing the open popup function from index.js so the popupConfirmation will open
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__description-button_liked");
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this); //event listener for the img thay will open upon click
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleOpenPopup(this);
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

    this._cardTitleEl.textContent = this.title; //puting the title to the text content of the card that i resiving
    this._cardImageEl.src = this.link; //puting the link to src of the card to render the img
    this._cardImageEl.alt = this.title; //coping the title to put it as an alt of the img
    this._cardImageEl._id = this.cardId;
    this._setEventListeners(); //calling the eventListeners

    return this._cardElement; ///returning the card element
  }
}
