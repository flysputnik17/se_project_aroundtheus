import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  editButton,
  addButton,
  profileForm,
  nameInput,
  jobInput,
  cardForm,
  config,
} from "../utils/constants.js";
import Api from "../components/Api.js";

const editFormValidator = new FormValidator(config, profileForm); //creating a new var for the edit modal using the FormValidator class
const addCardFormValidator = new FormValidator(config, cardForm);

const newEditPopup = new PopupWithForm(
  ".profile-modal",
  handleProfileFormSubmit
); //creating a new var for edit form from the popupWithForm class
newEditPopup.setEventListeners();

const newCardPopup = new PopupWithForm(".card-modal", addCardElement);
//creating a new var for the card form from the popupWithFrom class
newCardPopup.setEventListeners();

const newImagePopup = new PopupWithImage(".image-modal");
newImagePopup.setEventListeners();

const sectionCards = new Section(
  { items: initialCards, renderer: createCard },
  ".cards"
);

const userInfo = new UserInfo(".profile__name", ".profile__descripton");

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

//function that opening the img popup
function handleImageClick(card) {
  newImagePopup.open(card);
}

function createCard(cardData) {
  const cardElem = new Card(cardData, "#card-template", handleImageClick);
  return cardElem.getView();
}

function addCardElement(cardData) {
  //sectionCards.addItem(createCard(cardData));
  api.addNewCard(cardData.title, cardData.link).then(() => {
    sectionCards.addItem(createCard(cardData));
    addCardFormValidator.resetValidation();
    newCardPopup.close();
  });
}

function handleProfileFormSubmit(userData) {
  api
    .updateUserInfo(userData.name, userData.descripton)
    .then(() => {
      userInfo.setUserInfo(userData.name, userData.descripton);
      newEditPopup.close();
    })
    .catch((error) => {
      console.error("Error in updateUserInfo:", error);
      if (error instanceof SyntaxError) {
        console.error("Response body:", error.body);
      }
    });
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  api.getUserInfo().then((userData) => {
    userInfo.getUserInfo(userData.name, userData.about);
    editFormValidator.resetValidation();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    newEditPopup.open();
  });
});

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  newCardPopup.open();
});

//////////////////// cards events //////////////////////

editFormValidator.enableValidation(); //calling the enableValidation method from the new created var that has this method inside the class
addCardFormValidator.enableValidation();

const api = new Api({});

api.getInitialCards().then((cardData) => {
  cardData.forEach((card) => {
    const newCard = createCard(card);
    sectionCards.addItem(newCard);
  });
  sectionCards.renderItems();
});

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about); //by calling the api.getUserInfo method of this class
  //and in the .then method after we get a response we calling the setUserInfo of the UserInfo class
  //and passing it the userData as a propery{name and about} are proporty of the body we get from the
  //API and in the setUserInfo we assinig the name and about to the name and description textContent
});
