export class Card {
  constructor(place, cardSelector) {
    this._place = place;
    this._cardSelector = cardSelector;
  }

  render(container) {
    const cardItem = document.querySelector(this._cardSelector).content.cloneNode(true);
    cardItem.querySelector('.element__heading').textContent = this._place.name;
    cardItem.querySelector('.element__photo').src = this._place.link;

    //лайк
    cardItem.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);
    //ремув
    cardItem.querySelector('.element__delete').addEventListener('click', this._removeCard);
    //открытия картинки
    cardItem.querySelector('.element__photo').addEventListener('click', this._handleImageClick(this._place.name, this._place.link));

    container.append(cardItem);
  }

  _handleLikeIcon(event) {
    event.target.classList.toggle('element__like_active');
  }

  _removeCard(event) {
    event.target.closest('.element').remove();
  }

  _handleImageClick = (name, link) => () => {
    openPopup(popupImage);
    popupImageSrc.src = link;
    popupImageSrc.alt = name + '(фото)';
    popupImageCaption.textContent = name;
  }
}