import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteButtonClick) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  setEventListeners(cardId) {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteButtonClick(cardId); //passing the confirmDelete function from the index.js with the cardId parameter
      super.close();
    });
    super.setEventListeners();
  }
}
