export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarImage) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarImage);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      descripton: this._job.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._job.textContent = description;
  }

  loadUserInfo(name, description, avatar) {
    this.setUserInfo(name, description);
    this._avatar.src = avatar;
  }
}
