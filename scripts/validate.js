////////////////////////////////////////////////////////validation function's////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showInputError(formElement, formInput, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`); //creating an variable that will be representing the span of the error message by its input id in the current form
  formInput.classList.add(options.inputErrorClass); //adding the class with the error style to the input field
  errorElement.textContent = errorMessage; //inside the span i storing the generic error text message
  errorElement.classList.add(options.errorClass); //and adding the style to the custome error message
}

function hideInputError(formElement, formInput, options) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`); //this function is the same as showInputError but here im removing all the style classes
  formInput.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, formInput, options) {
  if (!formInput.validity.valid) {
    showInputError(
      formElement,
      formInput,
      formInput.validationMessage,
      options
    ); //if the formInput valid is on false statuse then i will call the showInputError function as long as valid is not flase
  } else {
    hideInputError(formElement, formInput, options); //if the valid of the formInput is true then i calling the hideInputError function that will hide the error message
  }
}

function setEventListeners(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  ); //creating an array of all the inputs that are in the current form
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, submitButton, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options); //iterating over each element of the arrray that is representing an input field and calling on every one of them the checkInputValidity function
      toggleButtonState(inputList, submitButton, options);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButton, options) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  }
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector)); //creating an array of forms from that have a modal__form class in it currently there are only two forms
  formList.forEach((formListElement) => {
    formListElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); //iterating over every form from the list i createad
    });
    setEventListeners(formListElement, options); //calling the serEventListeners function on every element of the formList array that is storing all the form that are on the web page
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button-inactive",
  inputErrorClass: "modal__form-input-error",
  errorClass: "modal__form-error-active",
};

enableValidation(config);
