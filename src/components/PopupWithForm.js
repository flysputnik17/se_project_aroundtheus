import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form"); //selecting the popup form by its class modal_form
    this._inputList = this._popupForm.querySelectorAll(".modal__form-input"); //from the form selecting all the inputs
    this._submitButton = this._popupElement.querySelector(
      ".modal__form-button"
    );
    this._handleFormSubmit = handleFormSubmit; //its the function for the submit
  }

  close() {
    this._popupForm.reset(); //reseting the inputs of the popup form
    super.close(); //calling the close method of the Popup parent class since the close method of the child only reseting the inputs and the parent close method closing the popup itself
  }

  _getInputValues() {
    const inputValues = {}; //creating an abject to store the inputs
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value; //itreting over all the inputs and storing them in the inputList object
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  setLoading(loading) {
    if (loading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); //calling the submit funciton and pasing it the inputs object
    });

    super.setEventListeners(); //calling the parent setEvent method since the child method only waiting for a submit event but we need it also be ebale to listen for the
  }
}
