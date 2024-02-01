export default class Api {
  constructor() {
    this._baseUrl = "https://around-api.en.tripleten-services.com/v1";
    this._headers = {
      authorization: "bfb869e8-08ec-4b67-8cc1-518f5a35ed9e",
      "Content-Type": "application/json",
    };
  }

  //__checkResponse method for checking the response of the server requst if OK the ethod returning a JSON object else its returning an error status
  _checkResponse(res) {
    if (res.ok) {
      return res.json(); //returning the JSON objet in case the res is ok
    }
    console.error(res.status);
    return Promise.reject(`Error:${res.status}`); //returning Error status
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error("Error in getUserInfo:", error);
        return Promise.reject(error);
      });
  }

  updateUserInfo(name, descripton) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: descripton,
      }),
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error("Error in updateUserInfo:", error);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        this._items = data; // Update _items with the received data
        return data;
      })

      .catch((error) => {
        console.error("Error in getInitialCards:", error);
        return Promise.reject(error);
      });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error("Error in addNewCard:", error);
        return Promise.reject(error);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error("Error in deleteCard:", error);
        return Promise.reject(error);
      });
  }
}
