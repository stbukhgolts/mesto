export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    this._cardImage = cardElement.querySelector('.element__photo');
    return cardElement;
  }
  //like
  _handleLikeIcon(event) {
    event.target.classList.toggle('element__like_active');
  }
  //del
  _removeCard(event) {
    event.target.closest('.element').remove();
  }


  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);//like
    this._element.querySelector('.element__delete').addEventListener('click', this._removeCard);//del
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__heading').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name} (фото)`;


    return this._element;
  }
}

