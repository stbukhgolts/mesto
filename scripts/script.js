const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const popupImage = document.querySelector('.popup__view-image');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close')
const popupEditButtonClose = popupEdit.querySelector('.popup__button-close');
const popupImageButtonClose = popupImage.querySelector('.popup__button-close');
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

const popupViewImage = document.querySelector('.popup__view-image');


//функция удаления карточки
function removeCard(event) {
  const targetCard = event.target.closest('.element');
  targetCard.remove();
}

//функия добавления лисенеров на кнопку удаления
function addEventListenerToButton(cardItem) {
  const removeButton = cardItem.querySelector('.element__delete');
  removeButton.addEventListener('click', removeCard);
}

//фунция преобразования массива в дом
function createCard({ name, link }) {
  const card = template.content.cloneNode(true);
  const text = card.querySelector('.element__heading');
  text.textContent = name;
  const img = card.querySelector('.element__photo');
  img.src = link;
  //слушать кнопку удалить
  addEventListenerToButton(card);
  //like
  card.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })
  //картинка
  card.querySelector('.element__photo').addEventListener('click', () => handleImageClick(text.textContent, img.src));

  return card;
}

//закрыть попап
function handeleButtonCloseClick(popupButtonClose) {
  popupButtonClose.classList.remove('popup_opened');
}

//фунция добавления карточки
function addCard(event) {
  event.preventDefault();
  const placeName = imgTitleInput.value;
  const placeSrc = imgSrcInput.value;
  const newCard = createCard({ name: placeName, link: placeSrc });
  elements.prepend(newCard);
  handeleButtonCloseClick(popupAdd);
  imgTitleInput.value = '';
  imgSrcInput.value = '';
}

//функция открытия
function openPop(popName) {
  popName.classList.add('popup_opened');
}

//открыть попап редактирования
function handleButtonEditClick() {
  openPop(popupEdit);
  popupInputHeading.value = profileHeading.textContent;
  popupInputSubheading.value = profileSubheading.textContent;
}

//открыть попап добавления
function handleButtonAddClick() {
  openPop(popupAdd);
  imgTitleInput.placeholder = 'Название';
  imgSrcInput.placeholder = 'Ссылка на картинку';
}

//открыть попап картинки
function handleImageClick(name, link) {
  openPop(popupViewImage);
  const popupImageSrc = popupImage.querySelector('.popup__image');
  popupImageSrc.src = link;
  const popupImageCaption = popupImage.querySelector('.popup__caption');
  popupImageCaption.textContent = name;
}

//ввод заголовка и подзаголовка
function handleFormSubmit(event) {
  event.preventDefault();
  profileHeading.textContent = popupInputHeading.value;
  profileSubheading.textContent = popupInputSubheading.value;
  handeleButtonCloseClick(popupEdit);
}

//изначальный массив на экран
function renderCards() {
  const cards = initialCards.map(createCard);
  elements.append(...cards);
}

//открыть попап редактирования профайла
profileButtonEdit.addEventListener('click', handleButtonEditClick);
//открыть попап добавления места
addButtonEdit.addEventListener('click', handleButtonAddClick);
//закрыть попап редактирования профайла
popupEditButtonClose.addEventListener('click', ()=>handeleButtonCloseClick(popupEdit));
//закрыть попап добавления места
popupAddButtonClose.addEventListener('click', ()=>handeleButtonCloseClick(popupAdd));
//закрыть попап с картинкой
popupImageButtonClose.addEventListener('click', ()=>handeleButtonCloseClick(popupImage));
//ввод заголовка и подзаголовка
popupFormEdit.addEventListener('submit', handleFormSubmit);
//ввод места и урл
popupFormAdd.addEventListener('submit', addCard);

renderCards();