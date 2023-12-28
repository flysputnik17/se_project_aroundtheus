export class FormValidator {
  constructor(config, formElement) {
    this._form = formElement; //storing the form element inside this._form
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid; //returning true if there is atleast one false and then by the ! i returning false
    });
  }

  toggleButtonState(inputElement) {
    if (this._hasInvalidInput(inputElement)) {
      this.submitButton.classList.add(this._inactiveButtonClass);
      this.submitButton.disabled = true; //if the hasInvalidInput returning true that means that there is some invalid inputs and i need to disabled the button
    } else {
      this.submitButton.classList.remove(this._inactiveButtonClass);
      this.submitButton.disabled = false; //if the hasInvalidInput returning false that measns that all the input fields are valid and i need to activate the buttun
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //storing the errorElement by the input element id from the HTML
    inputElement.classList.add(this._inputErrorClass); //add the error class to it
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage; //input the generic error massege
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  ///the serEventListeners function is the main function that listen to all events in the form its creating a array from all the forms that hade the class of modal
  //and then for each of the elements in the array that was created it runing the _checkInputValidity and toggleButtonState function on every input event in the form
  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this.submitButton = this._form.querySelector(this._submitButtonSelector);
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); //iterating over each element of the arrray that is representing an input field and calling on every one of them the checkInputValidity function
        this.toggleButtonState(inputElement);
      });
    });
  }

  //resetValidation funciton is a public func so i can call it from the index.js to reset the inputs and the submit buttons
  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
