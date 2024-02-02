export const initialCards = [
  // {
  //   name: "Yosemite Valley",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  //   id: "1",
  // },
  // {
  //   name: "Lake Louise",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  //   id: "2",
  // },
  // {
  //   name: "Bald Mountains",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  //   id: "3",
  // },
  // {
  //   name: "Latemar",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  //   id: "4",
  // },
  // {
  //   name: "Vanoise National Park",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  //   id: "5",
  // },
  // {
  //   name: "Lago di Braies",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  //   id: "6",
  // },
];

////////////////////////////////////////////// the modal elements selections //////////////////////////////////////////////

export const editButton = document.querySelector(".profile__edit-button"); //the profile edit button select
export const addButton = document.querySelector(".profile__add-button"); // the selection of add button
export const profileModal = document.querySelector(".profile-modal"); //the modal selecting

export const profileForm = document.forms["profile-form"]; //the modal form selecting

export const profileName = document.querySelector(".profile__name"); //the profile name from the page
export const nameInput = profileModal.querySelector("#modal__form-name"); //the profile name input in modal

export const profileJob = document.querySelector(".profile__descripton"); //the profile job from the page
export const jobInput = profileModal.querySelector("#modal__form-job"); //the profile job input form modal

/////////////////////////////////////// the Add modal elements selections ////////////////////////////////////////////////////////

export const addModal = document.querySelector(".card-modal"); // the add modal selection
export const imgName = addModal.querySelector("#modal__form-title"); //img modal selection
export const imgUrl = addModal.querySelector("#modal__form-url"); //img url element selection
export const cardForm = document.forms["card-form"];

///////////////////////////////////////the modals element selections///////////////////////////////////////////////////////////

export const modals = document.querySelectorAll(".modal");

/////////////////////////////////////////////////////// the card list selection ///////////////////////////////////////////

export const cardListEl = document.querySelector(".cards");

export const imgModal = document.querySelector(".image-modal");
export const imgSrc = imgModal.querySelector(".modal__img-card-img");
export const imgTitle = imgModal.querySelector(".modal__img-title");

export const card = document.querySelector(".card");

/////////////////////////////////////////////////////////////validation//////////////////////////////
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button-inactive",
  inputErrorClass: "modal__form-input-error",
  errorClass: "modal__form-error-active",
};
