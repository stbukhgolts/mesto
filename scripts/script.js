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

const elements = document.querySelector('.elements');
const imgTitleInput = popupAdd.querySelector('.popup__input_text_heading');
const imgSrcInput = popupAdd.querySelector('.popup__input_text_src');
const popupFormAdd = popupAdd.querySelector('.popup__form');
const template = document.querySelector('.template');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupButtonSubmit = popupEdit.querySelector('.popup__button-submit');
const popups = document.querySelectorAll('.popup');

//функция удаления карточки
function removeCard(event) {
  event.target.closest('.element').remove();
}
//функция лайка
function handleLikeIcon(event) {
  event.target.classList.toggle('element__like_active');
}
//функция открытия картинки
function handleImageClick(name, link) {
  openPopup(popupImage);
  popupImageSrc.src = link;
  popupImageSrc.alt = name + '(фото)';
  popupImageCaption.textContent = name;
}

//фунция преобразования массива в дом
function createCard({ name, link }) {
  const card = template.content.cloneNode(true);
  const cardText = card.querySelector('.element__heading');
  const cardImg = card.querySelector('.element__photo');
  const cardLike = card.querySelector('.element__like')
  const removeButton = card.querySelector('.element__delete');
  //задать данные для картинки
  cardText.textContent = name;
  cardImg.src = link;
  cardImg.alt = name + '(фото)';
  //слушать кнопку удалить
  removeButton.addEventListener('click', removeCard);
  //like
  cardLike.addEventListener('click', handleLikeIcon);
  //картинка
  cardImg.addEventListener('click', () => handleImageClick(name, link));
  return card;
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


//фунция добавления карточки
function handleFormAddCard(event) {
  event.preventDefault();
  const newCard = createCard({ name: imgTitleInput.value, link: imgSrcInput.value });
  elements.prepend(newCard);
  closePopup(popupAdd);
  popupFormAdd.reset();
}


//открыть попап редактирования
function handleButtonEditClick() {
  openPopup(popupEdit);
  popupInputHeading.value = profileHeading.textContent;
  popupInputSubheading.value = profileSubheading.textContent;
  setButtonState(popupButtonSubmit, popupFormEdit.checkValidity(), validationConfig);
}

//ввод заголовка и подзаголовка
function handleFormSubmit(event) {
  event.preventDefault();
  profileHeading.textContent = popupInputHeading.value;
  profileSubheading.textContent = popupInputSubheading.value;
  closePopup(popupEdit);
}

//изначальный массив на экран
function renderCards() {
  const cards = initialCards.map(createCard);
  elements.append(...cards);
}

//открыть попап редактирования профайла
profileButtonEdit.addEventListener('click', handleButtonEditClick);
//открыть попап добавления места
addButtonEdit.addEventListener('click', ()=>openPopup(popupAdd));
//ввод заголовка и подзаголовка
popupFormEdit.addEventListener('submit', handleFormSubmit);
//ввод места и урл
popupFormAdd.addEventListener('submit', handleFormAddCard);

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


renderCards();