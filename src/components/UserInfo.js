export default class UserInfo {
  constructor({ user, info }) {
    this._user = user;
    this._info = info;
  }

  getUserInfo() {
    return { 
      user: this._user.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfo({ user, info }) {
    this._user.textContent = user;
    this._info.textContent = info;
  }
}