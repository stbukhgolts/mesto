const popup = document.querySelector('.popup');

//открыть попап

function handleButtonEditClick() {
  popup.classList.add('popup_opened');
}

const profileButtonEdit = document.querySelector('.profile__button-edit');
profileButtonEdit.addEventListener('click', handleButtonEditClick);


//закрыть попап
function handeleButtonCloseClick() {
  popup.classList.remove('popup_opened');
  popupInputHeading.value = profileHeading.textContent
  popupInputSubheading.value = profileSubheading.textContent
}

const popupButtonClose = document.querySelector('.popup__button-close');
popupButtonClose.addEventListener('click', handeleButtonCloseClick);


//ввод заголовка и подзаголовка
const popupForm = document.querySelector('.popup__form');
const profileHeading = document.querySelector('.profile__heading');
const profileSubheading = document.querySelector('.profile__subheading');
const popupInputHeading = document.querySelector('.popup__input_heading');
const popupInputSubheading = document.querySelector('.popup__input_subheading');

function handleFormSubmit(event) {
  event.preventDefault();
  profileHeading.textContent = popupInputHeading.value;
  profileSubheading.textContent = popupInputSubheading.value;
}

popupForm.addEventListener('submit', handleFormSubmit);

//
popupInputHeading.value = profileHeading.textContent
popupInputSubheading.value = profileSubheading.textContent