import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  editButton,
  addButton,
  profileModal,
  profileForm,
  profileName,
  nameInput,
  profileJob,
  jobInput,
  addModal,
  imgName,
  imgUrl,
  cardForm,
  modals,
  cardListEl,
  imgModal,
  imgSrc,
  imgTitle,
  config,
} from "../utils/constants.js";
const editFormValidator = new FormValidator(config, profileForm); //creating a new var for the edit modal using the FormValidator class
const addCardFormValidator = new FormValidator(config, cardForm);

const newEditPopup = new PopupWithForm(profileModal, handleProfileFormSubmit); //creating a new var for edit form from the popupWithForm class
newEditPopup.setEventListeners();

const newCardPopup = new PopupWithForm(addModal, addCardElement); //creating a new var for the card form from the popupWithFrom class
newCardPopup.setEventListeners();

const newImagePopup = new PopupWithImage(imgModal, imgTitle);
newImagePopup.setEventListeners();

const sectionCards = new Section(
  { items: initialCards, renderer: createCard },
  cardListEl
);

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

//function that opening the img popup
function handleImageClick(card) {
  imgTitle.textContent = card.title; //assining the card title to be the img title when the img popup is opening
  imgSrc.src = card.link;
  imgSrc.alt = card.title;
  newImagePopup.open(imgTitle, imgSrc);
}

function createCard(cardData) {
  const cardElem = new Card(cardData, "#card-template", handleImageClick);
  return cardElem.getView();
}

function addCardElement(evt) {
  evt.preventDefault();
  const title = imgName.value; //name now will recive the value of the input that the user puts in the form
  const link = imgUrl.value; //link now will recive the value of the url that the user inputs
  const cardElem = createCard({ title, link });
  evt.target.reset(); //reseting the inputs after user submit a form
  addCardFormValidator.toggleButtonState();
  sectionCards.addItem(cardElem);
  newCardPopup.close();
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

const userInfo = new UserInfo(profileName, profileJob);

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  const userData = userInfo.getUserInfo(); //storing the inputs textContent in the userData var
  editFormValidator.resetValidation();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  newEditPopup.open();
});

function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData.name, userData.descripton);
  newEditPopup.close();
}

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  newCardPopup.open();
});

//////////////////// cards events //////////////////////
sectionCards.renderItems();

editFormValidator.enableValidation(); //calling the enableValidation method from the new created var that has this method inside the class
addCardFormValidator.enableValidation();
