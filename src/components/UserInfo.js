export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = nameSelector;
    this._job = jobSelector;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(name, job) {
    this._name = name.textContent;
    this._job = job.textContent;
  }
}
