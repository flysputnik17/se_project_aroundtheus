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
const profileModal = document.querySelector(".profile-modal"); //the modal selecting
const closeEditButton = profileModal.querySelector(".modal__close-button"); //the modal close button selecting

const profileForm = profileModal.querySelector(".modal__form"); //the modal form selecting

const profileName = document.querySelector(".profile__name"); //the profile name from the page
const nameInput = profileModal.querySelector("#modal_form-name"); //the profile name input in modal

const profileJob = document.querySelector(".profile__descripton"); //the profile job from the page
const jobInput = profileModal.querySelector("#modal_form-job"); //the profile job input form modal

/////////////////////////////////////// the Add modal elements selections ////////////////////////////////////////////////////////

const addModal = document.querySelector(".card-modal"); // the add modal selection
const addButton = document.querySelector(".profile__add-button"); // the selection of add button
const closeAddModalButton = addModal.querySelector(".modal__close-button"); //the close button
const imgName = addModal.querySelector("#addModal_form-name");
const imgUrl = addModal.querySelector("#addModal__form-url");
const cardForm = addModal.querySelector(".modal__form");

/////////////////////////////////////////////////////// the card list selection ///////////////////////////////////////////

const cardListEl = document.querySelector(".cards");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const imgModal = document.querySelector(".image-modal");
const imgCloseButton = imgModal.querySelector(".modal__img-close-button");
const imgSrc = imgModal.querySelector(".modal__img-card-img");
const imgTitle = imgModal.querySelector(".modal__img-title");

////////////////////////////////////////////////////// functions ///////////////////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //preventin the refresh of the page
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__description-title");
  const cardImageEl = cardElement.querySelector(".card__img");
  const likeButton = cardElement.querySelector(".card__description-button"); //finding the like button inside each card element so even when new card will be created it will work
  const deleteButton = cardElement.querySelector(".card__delete-button"); //finding the delete button inside each card element so even when new card will be created it will work

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__description-button_liked");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleEl.textContent = data.name;
  cardImageEl.alt = data.name;
  cardImageEl.src = data.link;

  cardImageEl.addEventListener("click", () => {
    openPopup(imgModal);

    imgSrc.src = cardImageEl.src;
    imgSrc.alt = cardTitleEl.textContent;
    imgTitle.textContent = cardTitleEl.textContent;
  });

  return cardElement; //this fucntion will return a new card that has name alt and a link
}

function addCardElement(evt) {
  evt.preventDefault();
  const name = imgName.value; //name now will recive the value of the input that the user puts in the form
  const link = imgUrl.value; //link now will recive the value of the url that the user inputs
  const newCard = getCardElement({ name, link }); //newCard will call for the getCardElement and create a new card the funciton gets object that contine the user name and kink for the new card
  evt.target.reset(); //reseting the inputs after user submit a form
  cardListEl.prepend(newCard);
  closePopup(addModal);
}

////////////////////////////////////////////////////////validation function's////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showInputError(formElement, formInput, errorMessage) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`); //creating an variable that will be representing the span of the error message by its input id in the current form
  formInput.classList.add("modal__form-input-error"); //adding the class with the error style to the input field
  errorElement.textContent = errorMessage; //inside the span i storing the generic error text message
  errorElement.classList.add("form__input-error-active"); //and adding the style to the custome error message
}

function hideInputError(formElement, formInput) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`); //this function is the same as showInputError but here im removing all the style classes
  formInput.classList.remove("modal__form-input-error");
  errorElement.classList.remove("form__input-error-active");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, formInput) {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage); //if the formInput valid is on false statuse then i will call the showInputError function as long as valid is not flase
  } else {
    hideInputError(formElement, formInput); //if the valid of the formInput is true then i calling the hideInputError function that will hide the error message
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__form-input")
  ); //creating an array of all the inputs that are in the current form
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement); //iterating over each element of the arrray that is representing an input field and calling on every one of them the checkInputValidity function
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".modal__form")); //creating an array of forms from that have a modal__form class in it currently there are only two forms
  formList.forEach((formListElement) => {
    formListElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); //iterating over every form from the list i createad
    });
    setEventListeners(formListElement); //calling the serEventListeners function on every element of the formList array that is storing all the form that are on the web page
  });
}

///////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////////////

//////////////////////////// modal events ///////////////////
editButton.addEventListener("click", function () {
  openPopup(profileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; //open profile modal event
});

closeEditButton.addEventListener("click", () => {
  closePopup(profileModal); //close profile modal event
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

/////////// add modal events /////////////////////////
addButton.addEventListener("click", () => {
  openPopup(addModal); //open add button event
});

closeAddModalButton.addEventListener("click", () => {
  closePopup(addModal); //close add button event
});

cardForm.addEventListener("submit", addCardElement);

//////////////////// cards events //////////////////////
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
}); //rendering the cards

imgCloseButton.addEventListener("click", () => {
  closePopup(imgModal); //close img modal event
});

enableValidation();
