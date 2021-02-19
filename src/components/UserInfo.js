export default class UserInfo {
  constructor({ user, info, userId }) {
    this._user = user;
    this._info = info;
    this._userId = userId;
  }

  getUserInfo() {
    return { 
      user: this._user.textContent,
      info: this._info.textContent,
      userId: this._userId
    }
  }

  setUserInfo({ user, info, userId }) {
    this._user.textContent = user;
    this._info.textContent = info;
    this._userId = userId
  }
}