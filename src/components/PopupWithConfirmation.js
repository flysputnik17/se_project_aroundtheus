import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteButtonClick) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  setEventListeners(cardId) {
    this._popupForm.addEventListener("submit", (evt) => {
      this._handleDeleteButtonClick(cardId); //passing the confirmDelete function from the index.js with the cardId parameter
      evt.preventDefault();
      super.close();
    });
    super.setEventListeners();
  }
}
