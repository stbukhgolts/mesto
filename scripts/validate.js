//показать ошибку
function showError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputInvalidClass);
}
//скрыть ошибку
function hideError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputInvalidClass);
}
//проверять конкретный импут на валидность
function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config);
  } else {
    showError(form, input, config);
  }
}

//проверять состояние кнопки
function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  } else {
    button.classList.add(config.buttonInvalidClass);
    button.disabled = true;
  }
}

//провалидируем форму
function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  //повесить на каждый импут обработчик событий
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form=> {
    setEventListener(form, config)

    //для каждой формы запрешаем действие по умолчанию
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //при загрузке страницы - все кнопки заблокированы
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  })
}



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};

enableValidation(validationConfig);