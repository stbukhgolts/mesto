export class FormValidator {
  constructor(config) {
    this._config = config;
  }

  enableValidation() {
    const forms = document.querySelectorAll(this._config.formSelector);
    forms.forEach(form=> {
      this._setEventListener(form, this._config)
  
      //для каждой формы запрешаем действие по умолчанию
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      //при загрузке страницы - все кнопки заблокированы
      const submitButton = form.querySelector(this._config.submitButtonSelector);
      this._setButtonState(submitButton, form.checkValidity(), this._config);
    })
  }

  _setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
  
    //повесить на каждый инпут обработчик событий
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input, this._config);
        this._setButtonState(submitButton, form.checkValidity(), this._config);
      });
    });
  }
  //показать ошибку
  _showError(form, input, config) {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);

  }
  //скрыть ошибку
  _hideError(form, input, config) {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputInvalidClass);
  }
  //проверять конкретный инпут на валидность
  _checkInputValidity(form, input, config) {
    if (input.validity.valid) {
      this._hideError(form, input, config);
    } else {
      this._showError(form, input, config);
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

}







