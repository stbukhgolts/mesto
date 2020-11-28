const popup = document.querySelector('.popup');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close');
const popupForm = document.querySelector('.popup__form');
const profileHeading = document.querySelector('.profile__heading');
const profileSubheading = document.querySelector('.profile__subheading');
const popupInputHeading = document.querySelector('.popup__input_heading');
const popupInputSubheading = document.querySelector('.popup__input_subheading');


//открыть попап
function handleButtonEditClick() {
  popup.classList.add('popup_opened');
  popupInputHeading.value = profileHeading.textContent;
  popupInputSubheading.value = profileSubheading.textContent;
}

//закрыть попап
function handeleButtonCloseClick() {
  popup.classList.remove('popup_opened');
}

//ввод заголовка и подзаголовка
function handleFormSubmit(event) {
  event.preventDefault();
  profileHeading.textContent = popupInputHeading.value;
  profileSubheading.textContent = popupInputSubheading.value;
  handeleButtonCloseClick();
}

//открыть попап
profileButtonEdit.addEventListener('click', handleButtonEditClick);
//закрыть попап
popupButtonClose.addEventListener('click', handeleButtonCloseClick);
//ввод заголовка и подзаголовка
popupForm.addEventListener('submit', handleFormSubmit);