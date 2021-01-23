import { Card } from './Card.js';
import { FormValidator } from './validate.js';


initialCards.forEach((place) => {
  const initialCardsList = new Card(place, '.template');
  initialCardsList.render(document.querySelector('.elements'));
});

//фунция добавления карточки
function handleFormAddCard(event) {
  event.preventDefault();
  const newCard = new Card({ name: imgTitleInput.value, link: imgSrcInput.value }, '.template');
  newCard.render(document.querySelector('.elements'));
  closePopup(popupAdd);
  popupFormAdd.reset();
//кнопка активна
  formValidator.enableValidation();
}

//ввод места и урл
popupFormAdd.addEventListener('submit', handleFormAddCard);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};

const formValidator = new FormValidator(validationConfig);
formValidator.enableValidation();