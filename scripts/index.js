let initialCards = [
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
const modal = document.querySelector(".modal"); //the modal selecting
const closeEditButton = modal.querySelector(".modal__close-button"); //the modal close button selecting

const modalForm = modal.querySelector(".modal__form"); //the modal form selecting

const profileName = document.querySelector(".profile__name"); //the profile name from the page
const nameInput = modal.querySelector("#modal_form-name"); //the profile name input in modal

const profileJob = document.querySelector(".profile__descripton"); //the profile job from the page
const jobInput = modal.querySelector("#modal_form-job"); //the profile job input form modal

/////////////////////////////////////// the Add modal elements selections ////////////////////////////////////////////////////////

const addModal = document.querySelectorAll(".modal")[1]; // the add modal selection
const addButton = document.querySelector(".profile__add-button"); // the selection of add button
const closeAddModalButton = addModal.querySelector(".modal__close-button"); //the close button
const imgName = addModal.querySelector("#addModal_form-name");
const imgUrl = addModal.querySelector("#addModal__form-url");
const createImage = addModal.querySelector(".modal__form");

/////////////////////////////////////////////////////// the card list selection ///////////////////////////////////////////

const cardListEl = document.querySelector(".cards");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

function closePopop() {
  modal.classList.remove("modal_opened");
  addModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //preventin the refresh of the page
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopop();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__description-title");
  const cardImageEl = cardElement.querySelector(".card__img");
  cardTitleEl.textContent = data.name;
  cardImageEl.alt = data.name;
  cardImageEl.src = data.link;
  return cardElement;
}

function addCardElement(evt) {
  evt.preventDefault();
  const newCard = cardTemplate.cloneNode(true);
  const newCardTitle = newCard.querySelector(".card__description-title");
  const newCardImage = newCard.querySelector(".card__img");
  newCardTitle.textContent = imgName.value;
  newCardImage.alt = imgName.value;
  newCardImage.src = imgUrl.value;
  cardListEl.prepend(newCard);
  closePopop();
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeEditButton.addEventListener("click", closePopop);

modalForm.addEventListener("submit", handleProfileFormSubmit);

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  addModal.classList.add("modal_opened");
});

closeAddModalButton.addEventListener("click", closePopop);

createImage.addEventListener("submit", addCardElement);

//////////////////// cards events //////////////////////
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});
