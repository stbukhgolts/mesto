import { profileHeading, profileSubheading } from '../index.js'

export default class UserInfo {
  constructor({ user, info }) {
    this._user = user;
    this._info = info;
  }

  getUserInfo() {
    return { 
      user: profileHeading.textContent,
      info: profileSubheading.textContent,
    }
  }

  setUserInfo() {
    profileHeading.textContent = this._user;
    profileSubheading.textContent = this._info;
  }
}