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
  updateAvatar,
  avatarForm,
  avatarImage,
  config,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const editFormValidator = new FormValidator(config, profileForm); //creating a new var for the edit modal using the FormValidator class
const addCardFormValidator = new FormValidator(config, cardForm);
const avatarUpdateValidator = new FormValidator(config, avatarForm);

const newEditPopup = new PopupWithForm(
  ".profile-modal",
  handleProfileFormSubmit
); //creating a new var for edit form from the popupWithForm class
newEditPopup.setEventListeners();

const newCardPopup = new PopupWithForm(".card-modal", addCardElement);
//creating a new var for the card form from the popupWithFrom class
newCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".avatar-modal", upDateAvatar);
avatarPopup.setEventListeners();

const newImagePopup = new PopupWithImage(".image-modal");
newImagePopup.setEventListeners();

const sectionCards = new Section(
  { items: initialCards, renderer: createCard },
  ".cards"
);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__descripton",
  ".profile__img"
);

const confirmationPopup = new PopupWithConfirmation(".confirmation-modal");
confirmationPopup.setEventListeners();

const api = new Api({});

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

//function that opening the img popup
function handleImageClick(card) {
  newImagePopup.open(card);
}

function createCard(cardData) {
  return new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteButtonClick,
    handleLikedButtonClick
  ).getView();
}

function addCardElement(cardData) {
  //sectionCards.addItem(createCard(cardData));
  api
    .addNewCard(cardData.title, cardData.link, cardData._id)
    .then((cardData) => {
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

/*
handleDeleteButtonClick function will be called only after the click of the delete
icon on the card that we want to delete
the method will open the popup of the confirm modal and will wait for the submit 
event , if the submit event is happaning only then the confirmationPopup.setSubmitAction()
*/
function handleDeleteButtonClick(card) {
  confirmationPopup.open(); //opening the popup
  confirmationPopup.setSubmitAction(() => {
    confirmationPopup.setDeleteLoading(true); //cahnge the text content of the confirm button
    api
      .deleteCard(card._id)
      .then((result) => {
        card.removeCardElement(result); //card.js method to remove the card_element
      })
      .catch((err) => {
        console.error(`${err} Failed to delete post.`);
      })
      .finally(() => {
        confirmationPopup.setDeleteLoading(false);
      });
  });
}
/*
handleLikedButtonClick funtion will be called after the event click on the like button
this function is passed to the card class
at the begining its checking if the isLiked is true or false and by the state
of the isLiked its decide's wich api method to call 
after the api call we manualy changing the isLiked atribute of the img with the
setLike function from the card class that adding or removing the like button
active class
*/
function handleLikedButtonClick(card) {
  if (card.isLiked) {
    api.dislikeCard(card._id).then((res) => {
      card.setLike(res.isLiked);
    });
  } else {
    api.likeCard(card._id).then((res) => {
      card.setLike(res.isLiked);
    });
  }
}

function upDateAvatar(avatar) {
  avatarPopup.setLoading(true);
  api.upDateAvater(avatar.link).then((res) => {
    avatarImage.src = res.avatar;
  });
  avatarUpdateValidator.resetValidation();
  avatarPopup.setLoading(false);
  avatarPopup.close();
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

updateAvatar.addEventListener("click", () => {
  avatarPopup.open();
});

//////////////////// cards events //////////////////////

editFormValidator.enableValidation(); //calling the enableValidation method from the new created var that has this method inside the class
addCardFormValidator.enableValidation();
avatarUpdateValidator.enableValidation();

////////////////////API///////////////////////////////////
api.getInitialCards().then((cardData) => {
  cardData.forEach((card) => {
    const newCard = createCard(card);
    sectionCards.addItem(newCard);
  });
  //by calling the api.getInitialCards method of this class and passing the renderItems method to the
  //.then method if the get response is ok only then the renderItems will be called and the cards will
  //be displyed to the page
});

api.getUserInfo().then((userData) => {
  userInfo.loadUserInfo(userData.name, userData.about, userData.avatar); //by calling the api.loadUserInfo method of this class
  //and in the .then method after we get a response we calling the setUserInfo of the UserInfo class
  //and passing it the userData as a propery{name,about and avatar} are proporty of the body we get from the
  //API and in the setUserInfo we assinig the name and about to the name and description textContent
});
