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
const popupButtonSubmit = popupEdit.querySelector('.popup__button-submit');
const popups = document.querySelectorAll('.popup');



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

//открыть попап редактирования
function handleButtonEditClick() {
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
addButtonEdit.addEventListener('click', ()=>openPopup(popupAdd));
//ввод заголовка и подзаголовка
popupFormEdit.addEventListener('submit', handleFormSubmit);


//закрытие по оверлею и крестику
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closePopup(popup)
        }
    })
});
