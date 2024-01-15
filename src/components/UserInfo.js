export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = nameSelector;
    this._job = jobSelector;
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
}
