import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImgTitle) {
    super({ popupSelector });
    this._popupImageSrc = popupSelector;
    this._popupTitle = popupImgTitle;
  }

  open({ name, link }) {
    this._popupTitle.value = name;
    this._popupImageSrc.src = link;
    this._popupImageSrc.alt = name;
    super.open();
  }
}
