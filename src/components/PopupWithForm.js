import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) { 
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input'); 
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
          
      }
      if (evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    });
    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    }
      );
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.querySelector('.popup__form').reset();
  }
}