import "../pages/index.css";
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

const newImagePopup = new PopupWithImage(imgModal);
newImagePopup.setEventListeners();

const sectionCards = new Section(
  { items: initialCards, renderer: createCard },
  cardListEl
);

const userInfo = new UserInfo(profileName, profileJob);

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

//function that opening the img popup
function handleImageClick(card) {
  newImagePopup.open(card);
}

function createCard(cardData) {
  const cardElem = new Card(cardData, "#card-template", handleImageClick);
  return cardElem.getView();
}

function addCardElement() {
  const title = imgName.value; //storing the input name of the new place
  const link = imgUrl.value; //storing the input URL of the new place
  sectionCards.addItem(createCard({ title, link })); //passing to the addItem method of the Section class the createCard function with the name and link proporty the function creating a new card element and the addItem will add the new card to the DOM
  addCardFormValidator.resetValidation();
  newCardPopup.close();
}

function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData.name, userData.descripton);
  newEditPopup.close();
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  const userData = userInfo.getUserInfo(); //storing the inputs textContent in the userData var
  editFormValidator.resetValidation();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  newEditPopup.open();
});

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  newCardPopup.open();
});

//////////////////// cards events //////////////////////
sectionCards.renderItems();

editFormValidator.enableValidation(); //calling the enableValidation method from the new created var that has this method inside the class
addCardFormValidator.enableValidation();
