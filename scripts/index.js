import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-cards.js';

const elements = document.querySelector('.elements');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_view-image');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupFormEdit = popupEdit.querySelector('.popup__form');
const profileHeading = document.querySelector('.profile__heading');
const profileSubheading = document.querySelector('.profile__subheading');
const popupInputHeading = popupEdit.querySelector('.popup__input_text_heading');
const popupInputSubheading = popupEdit.querySelector('.popup__input_text_subheading');
const addButtonEdit = document.querySelector('.profile__button-add');

const imgTitleInput = popupAdd.querySelector('.popup__input_text_heading');
const imgSrcInput = popupAdd.querySelector('.popup__input_text_src');
const popupFormAdd = popupAdd.querySelector('.popup__form');

const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};

const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);

//валидация форм
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

//функция открытия картинки
function handleImageClick(name, link) {
  popupImageSrc.src = link;
  popupImageSrc.alt = `${name} (фото)`;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

//закрытие с escape 
function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const popupName = document.querySelector('.popup_opened');
    closePopup(popupName);
  }
}

//открыть попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
}

//закрыть попап
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
}

//функция создания карточки
function createCard(data, cardSelector, handleCardClick) {
  const card = new Card(data, cardSelector, handleCardClick);
  const newCard = card.generateCard();
  return newCard
}


//фунция добавления карточки
function handleFormAddCard(event) {
  event.preventDefault();
  const newCard = createCard({ name: imgTitleInput.value, link: imgSrcInput.value }, '.template', handleImageClick);
  elements.append(newCard);
  closePopup(popupAdd);
}

//открыть попап редактирования профиля
function handleButtonEditClick() {
  formValidatorEdit.resetValidation();
  openPopup(popupEdit);
  popupInputHeading.value = profileHeading.textContent;
  popupInputSubheading.value = profileSubheading.textContent;
}

//ввод заголовка и подзаголовка
function handleFormSubmit(event) {
  event.preventDefault();
  profileHeading.textContent = popupInputHeading.value;
  profileSubheading.textContent = popupInputSubheading.value;
  closePopup(popupEdit);
}

//открыть попап редактирования профайла
profileButtonEdit.addEventListener('click', handleButtonEditClick);
//открыть попап добавления места
addButtonEdit.addEventListener('click', ()=> {
  popupFormAdd.reset();
  formValidatorAdd.resetValidation();
  openPopup(popupAdd)
  });
//ввод заголовка и подзаголовка
popupFormEdit.addEventListener('submit', handleFormSubmit);
//ввод места и урл
popupFormAdd.addEventListener('submit', handleFormAddCard);

//закрытие по оверлею и крестику
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
            
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closePopup(popup);
        }
    })
});

//экземпляр класса карточки в разметку
initialCards.forEach((place) => {
  const cardElement = createCard(place, '.template', handleImageClick);
  elements.append(cardElement);
});
