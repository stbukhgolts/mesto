import './pages/index.css'
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { initialCards } from './utils/initial-cards.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

const profileHeading = document.querySelector('.profile__heading');
const profileSubheading = document.querySelector('.profile__subheading');

const elements = '.elements';
const profileButtonEdit = document.querySelector('.profile__button-edit');
const addButtonEdit = document.querySelector('.profile__button-add');
const popupInputHeading = document.querySelector('.popup_type_edit').querySelector('.popup__input_text_heading');
const popupInputSubheading = document.querySelector('.popup_type_edit').querySelector('.popup__input_text_subheading');


//функция открытия картинки
function handleImageClick(name, link) {
  popupImage.open(name, link);
}

//функция создания карточки
function createCard(data, cardSelector, handleCardClick) {
  const card = new Card(data, cardSelector, handleCardClick);
  const newCard = card.generateCard();
  return newCard
}
const list = new Section({
  items: initialCards,
  renderer: (place) => {
      const cardElement = createCard(place, '.template', handleImageClick);
      
      list.addItem(cardElement);
    },
  },
  elements);

list.renderItems();

//класс профиля
const user = new UserInfo({ user: profileHeading, info: profileSubheading });



//ввод заголовка и подзаголовка
const handleProfileFormEditSubmit = ({ heading, subheading }) => {
  user.setUserInfo({ user: heading, info: subheading });
  popupEdit.close();
}

//фунция добавления карточки
const handleFormAddCard = ({ place, src }) => {
  const newCard = createCard({ name: place, link: src }, '.template', handleImageClick);
  list.prependItem(newCard);
  popupAdd.close();
}

//попапы
const popupEdit = new PopupWithForm('.popup_type_edit', handleProfileFormEditSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm('.popup_type_add', handleFormAddCard);
popupAdd.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_view-image');
popupImage.setEventListeners();


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};
//валидаторы
const formValidatorEdit = new FormValidator(validationConfig, '.popup_type_edit');
const formValidatorAdd = new FormValidator(validationConfig, '.popup_type_add');

//валидация форм
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

//открыть попап редактирования профиля
function handleProfileButtonEditClick() {
  formValidatorEdit.resetValidation();
  popupEdit.open();
  const currentUser = user.getUserInfo();
  popupInputHeading.value = currentUser.user;
  popupInputSubheading.value = currentUser.info;
}
//открыть попап редактирования профайла
profileButtonEdit.addEventListener('click', handleProfileButtonEditClick);

//открыть попап добавления места
addButtonEdit.addEventListener('click', ()=> {
  formValidatorAdd.resetValidation();
  popupAdd.open();
  }
);



