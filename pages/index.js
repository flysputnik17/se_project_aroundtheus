import { Card } from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

////////////////////////////////////////////// the modal elements selections //////////////////////////////////////////////

const editButton = document.querySelector(".profile__edit-button"); //the profile edit button select
const addButton = document.querySelector(".profile__add-button"); // the selection of add button
const profileModal = document.querySelector(".profile-modal"); //the modal selecting

const profileForm = document.forms["profile-form"]; //the modal form selecting

const profileName = document.querySelector(".profile__name"); //the profile name from the page
const nameInput = profileModal.querySelector("#modal__form-name"); //the profile name input in modal

const profileJob = document.querySelector(".profile__descripton"); //the profile job from the page
const jobInput = profileModal.querySelector("#modal__form-job"); //the profile job input form modal

/////////////////////////////////////// the Add modal elements selections ////////////////////////////////////////////////////////

const addModal = document.querySelector(".card-modal"); // the add modal selection
const imgName = addModal.querySelector("#modal__form-title"); //img modal selection
const imgUrl = addModal.querySelector("#modal__form-url"); //img url element selection
const cardForm = document.forms["card-form"];

///////////////////////////////////////the modals element selections///////////////////////////////////////////////////////////

const modals = document.querySelectorAll(".modal");

/////////////////////////////////////////////////////// the card list selection ///////////////////////////////////////////

const cardListEl = document.querySelector(".cards");

const imgModal = document.querySelector(".image-modal");
const imgSrc = imgModal.querySelector(".modal__img-card-img");
const imgTitle = imgModal.querySelector(".modal__img-title");

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

///the if checking if the modal is opened and if there is a class modal_opened if the statement is true the function will add the classs and will activate the event on the document
function openPopup(popup) {
  if (popup && !popup.classList.contains("modal_opened")) {
    popup.classList.add("modal_opened");
    document.addEventListener("keydown", closeByEscape);
  }
}
///this is the same function but here the class will be removed and the event will stop listen on the document
function closePopup(popup) {
  if (popup && popup.classList.contains("modal_opened")) {
    popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeByEscape);
  }
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //preventin the refresh of the page
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
}

//function that opening the img popup
function handleImageClick(card) {
  imgTitle.textContent = card.title; //assining the card title to be the img title when the img popup is opening
  imgSrc.src = card.link;
  imgTitle.alt = card.title;
  openPopup(imgModal);
}

function addCardElement(evt) {
  evt.preventDefault();
  const title = imgName.value; //name now will recive the value of the input that the user puts in the form
  const link = imgUrl.value; //link now will recive the value of the url that the user inputs
  const cardElem = new Card(
    { title, link },
    "#card-template",
    handleImageClick
  ); //cardElem will be created from the Card class
  const newCard = cardElem.getView();
  evt.target.reset(); //reseting the inputs after user submit a form
  cardListEl.prepend(newCard);
  closePopup(addModal);
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  openPopup(profileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; //open profile modal event
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closePopup(modal);
    }
  });
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  openPopup(addModal); //open add button event
});

cardForm.addEventListener("submit", addCardElement);

//////////////////// cards events //////////////////////

initialCards.forEach((data) => {
  const cardData = {
    title: data.name,
    link: data.link,
  };
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  const newCard = cardElement.getView();
  cardListEl.append(newCard);
}); //rendering the cards
