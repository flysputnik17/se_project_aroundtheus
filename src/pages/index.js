import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
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

const newCardPopup = new PopupWithForm(addModal, handleProfileFormSubmit); //creating a new var for the card form from the popupWithFrom class
newCardPopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob);

const newImagePopup = new PopupWithImage(imgModal, imgTitle);
newImagePopup.setEventListeners();

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

///the if checking if the modal is opened and if there is a class modal_opened if the statement is true the function will add the classs and will activate the event on the document
// function openPopup(popup) {
//   if (popup && !popup.classList.contains("modal_opened")) {
//     popup.classList.add("modal_opened");
//     document.addEventListener("keydown", closeByEscape);
//   }
// }
// ///this is the same function but here the class will be removed and the event will stop listen on the document
// function closePopup(popup) {
//   if (popup && popup.classList.contains("modal_opened")) {
//     popup.classList.remove("modal_opened");
//     document.removeEventListener("keydown", closeByEscape);
//   }
// }

// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".modal_opened");
//     if (openedPopup) {
//       closePopup(openedPopup);
//     }
//   }
// }

function handleProfileFormSubmit() {
  userInfo.setUserInfo(profileName, profileJob);
  //evt.preventDefault(); //preventin the refresh of the page
  // profileName.textContent = nameInput.value;
  // profileJob.textContent = jobInput.value;
  newEditPopup.close();
}

//function that opening the img popup
function handleImageClick(card) {
  imgTitle.textContent = card.title; //assining the card title to be the img title when the img popup is opening
  imgSrc.src = card.link;
  imgSrc.alt = card.title;
  newImagePopup.open(imgTitle, imgSrc);
}

function creatCard(cardItem) {
  const cardElem = new Card(cardItem, "#card-template", handleImageClick);
  return cardElem.getView();
}

function addCardElement(evt) {
  evt.preventDefault();
  const title = imgName.value; //name now will recive the value of the input that the user puts in the form
  const link = imgUrl.value; //link now will recive the value of the url that the user inputs
  const cardElem = creatCard({ title, link });
  evt.target.reset(); //reseting the inputs after user submit a form
  addCardFormValidator.toggleButtonState();
  cardListEl.prepend(cardElem);
  // closePopup(addModal);
  newCardPopup.close();
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  userInfo.getUserInfo();
  editFormValidator.resetValidation();
  //nameInput.value = profileName.textContent;
  //jobInput.value = profileJob.textContent; //open profile modal event
  // openPopup(profileModal);
  newEditPopup.open();
});

// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("modal_opened")) {
//       closePopup(modal);
//     }
//     if (evt.target.classList.contains("modal__close-button")) {
//       closePopup(modal);
//     }
//   });
// });

profileForm.addEventListener("submit", handleProfileFormSubmit);

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  // openPopup(addModal); //open add button event
  newCardPopup.open();
});

cardForm.addEventListener("submit", addCardElement);

//////////////////// cards events //////////////////////

initialCards.forEach(({ name, link }) => {
  const cardData = {
    title: name,
    link: link,
  };
  const cardElement = creatCard(cardData);
  cardListEl.append(cardElement);
}); //rendering the cards

editFormValidator.enableValidation(); //calling the enableValidation method from the new created var that has this method inside the class
addCardFormValidator.enableValidation();
