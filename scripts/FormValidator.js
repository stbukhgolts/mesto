export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  //показать ошибку
  _showError(input, config) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
  }
  //скрыть ошибку
  _hideError(input, config) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputInvalidClass);
  }
  //проверять конкретный инпут на валидность
  _checkInputValidity(input, config) {
    if (input.validity.valid) {
      this._hideError(input, config);
    } else {
      this._showError(input, config);
    }
  }
  //проверять состояние кнопки
  _setButtonState(button, isActive, config) {
    if (isActive) {
      button.classList.remove(config.buttonInvalidClass);
      button.disabled = false;
    } else {
      button.classList.add(config.buttonInvalidClass);
      button.disabled = true;
    }
  }

  _setEventListener(config) {
    const inputList = this._form.querySelectorAll(config.inputSelector);
    const submitButton = this._form.querySelector(config.submitButtonSelector);
  
    //повесить на каждый инпут обработчик событий
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input, this._config);
        this._setButtonState(submitButton, this._form.checkValidity(), this._config);
      });
    });
  }

  enableValidation() {
      this._setEventListener(this._config)
  
      //для каждой формы запрещаем действие по умолчанию
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault()});

      //при загрузке страницы - все кнопки заблокированы
      const submitButton = this._form.querySelector(this._config.submitButtonSelector);
      this._setButtonState(submitButton, this._form.checkValidity(), this._config);
    }
  
}







