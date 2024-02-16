export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarImage) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarImage);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._job.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._job.textContent = description;
  }

  loadUserInfo(name, description, avatar) {
    this._name.textContent = name;
    this._job.textContent = description;
    this._avatar.src = avatar;
  }
}
