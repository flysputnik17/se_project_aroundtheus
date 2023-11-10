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

const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const closeEditButton = modal.querySelector(".modal__closeButton");
const submitButton = modal.querySelector(".modal__form-button");

const profileName = document.querySelector(".profile__name"); //the profile name from the page
const nameInput = modal.querySelector("#modal_form-name"); //the profile name input in modal

const profileJob = document.querySelector(".profile__descripton"); //the profile job from the page
const jobInput = modal.querySelector("#modal_form-job"); //the profile job input form modal

const cardListEl = document.querySelector(".cards");

const cardTemplate =
  document.querySelector("#card-tamplate").content.firstElementChild;

function closePopop() {
  modal.classList.remove("modal_opened");
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
  cardImageEl.src = data.link;
  return cardElement;
}

editButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeEditButton.addEventListener("click", closePopop);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

modal.addEventListener("submit", handleProfileFormSubmit);
