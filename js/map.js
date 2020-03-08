'use strict';

(function () {
  var adMap = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters input');
  var address = notice.querySelector('#address');
  var mainPin = window.data.mapPins.querySelector('.map__pin--main');

  var disableElements = function () {
    for (var i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].setAttribute('disabled', '');
    }
  };

  var anableElements = function () {
    for (var i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].removeAttribute('disabled', '');
    }
  };

  disableElements(); // по дефолту запущена, переопределяется при активации

  var onSuccess = function (elementsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.QUANTITY_OF_OBJECTS; i++) {
      fragment.appendChild(window.pin.renderAds(elementsArray[i]));
    }
    return window.data.mapPins.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    // console.error(errorMessage);
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // функция активации страницы
  var activate = function () {
    window.load(onSuccess, onError);

    adForm.classList.remove('ad-form--disabled');
    adMap.classList.remove('map--faded');

    anableElements();

    mainPinY = parseInt((mainPinButton.style.top), 10) + window.data.ACTIVE_MAIN_PIN_HEIGHT;
    address.setAttribute('value', mainPinX + ', ' + mainPinY);
  };

  var notActivatedYet = true;
  mainPin.addEventListener('mousedown', function (evt) {
    if (notActivatedYet === false) {
      return;
    }
    if (evt.button === 0) {
      activate();
      notActivatedYet = false;
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (notActivatedYet === false) {
      return;
    }
    if (evt.key === 'Enter') {
      activate();
      notActivatedYet = false;
    }
  });

  // Заполнение поля адреса

  var mainPinButton = window.data.mapPins.querySelector('.map__pin--main');
  var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(window.data.MAIN_PIN_WIDTH / 2);
  var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(window.data.MAIN_PIN_HEIGHT / 2);

  address.setAttribute('value', mainPinX + ', ' + mainPinY);

  window.map = {
    adForm: adForm,
    adMap: adMap
  };
})();
