let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
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
const closeEditButton = document.querySelector(".modal__closeButton");

editButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
  let nameForm = document.querySelector(".profile__name");
  let modalFormName = document.querySelector("#modal_form-name");
  modalFormName.value = nameForm.textContent;
  let jodForm = document.querySelector(".profile__descripton");
  let modalFormJob = document.querySelector("#modal_form-job");
  modalFormJob.value = jodForm.textContent;
});

closeEditButton.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});
