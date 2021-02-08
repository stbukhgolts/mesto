import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) { 
    super(popupSelector);
  }

  open(name, link) {
    this._popup.classList.add('popup_opened');
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image').alt = `${name} (фото)`;
    this._popup.querySelector('.popup__caption').textContent = name;
    document.addEventListener('keydown', this._handleEscClose);
  }

}