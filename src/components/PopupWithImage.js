import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageSrc = this._popupElement.querySelector(
      ".modal__img-card-img"
    );
    this._popupTitle = this._popupElement.querySelector(".modal__img-title");
  }

  open({ title, link }) {
    this._popupTitle.textContent = title;
    this._popupImageSrc.src = link;
    this._popupImageSrc.alt = title;
    super.open();
  }
}
