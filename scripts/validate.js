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
  const submitButton = formElement.querySelector(".modal__form-button");
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement); //iterating over each element of the arrray that is representing an input field and calling on every one of them the checkInputValidity function
      toggleButtonState(inputList, submitButton);
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

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add("modal__form-button-inactive");
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove("modal__form-button-inactive");
    submitButton.removeAttribute("disabled");
  }
}

enableValidation();
