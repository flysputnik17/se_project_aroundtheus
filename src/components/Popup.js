export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    //opening the popup by accepting the popupSelector
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //closing the popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    //closing the popup by presing the ESC button
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //set listeners for popup for the close button and overly of the popup window
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("modal__close-button")) {
        this.close();
      }
    });
  }
}
