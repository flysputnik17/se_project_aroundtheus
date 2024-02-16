import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmationButton = this._popupElement.querySelector(
      ".modal__form-button"
    );
  }

  /*
  the setSubmitAction method get a handler in this case it will be the setDeleteLoading 
  and the api itself after that it will be called form the setEventListener and will be wating for 
  the submit event
  */
  setSubmitAction(handler) {
    this._handleSubmit = handler;
  }

  /*
  setDeleteLoading method get a true or false and will display the text Content 
  of the confirm button acording to the if statment
  its also part of the "handler" this method will be called form the setSubmitAction 
  */
  setDeleteLoading(loading) {
    if (loading) {
      this._confirmationButton.textContent = "Deleting...";
    } else {
      this._confirmationButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(); //its called form here since we wating for a submit event
      super.close();
    });
    super.setEventListeners();
  }
}
