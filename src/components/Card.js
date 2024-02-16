export class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikedClick
  ) {
    this.title = name;
    this.link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick; //passing the imgClick funtion form undex,js
    this._handleDeleteClick = handleDeleteClick; //passing the delete function from the index.js that will be triggerd when the delete icon is clicked
    this._handleLikedClick = handleLikedClick; //passing the handleLikedButtonClick funciton from the index.js
  }

  _handleLikeButton() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__description-button_liked");
    } else {
      this._likeButton.classList.remove("card__description-button_liked");
    }
  }

  //this function will get a true or false from the api that we call before
  //calling this function and then we pass the result of the api call to this
  //function and set the isLiked manualy to the img
  //also we calling the handleLikeButton to toggle the button classS
  setLike(isLiked) {
    this.isLiked = isLiked;
    this._handleLikeButton(this);
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this); //event listener for the img thay will open upon click
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikedClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this); //the (this) is for that the code will know on wich card call the delete function
    });
  }

  //function to cloneing the card templete
  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //removeCardElement function will be called form the index.js to remove the card after all the eventListeners are active
  removeCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
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

    this._setEventListeners(); //calling the eventListeners
    this._handleLikeButton();

    return this._cardElement; ///returning the card element
  }
}
