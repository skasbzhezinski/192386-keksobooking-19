'use strict';

(function () {
  var QUANTITY_OF_OBJECTS = 8;
  var MAIN_PIN_WIDTH = 65; // равна высоте в неактивном состоянии
  var MAIN_PIN_HEIGHT = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 84;

  var adMap = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters input');
  var address = notice.querySelector('#address');
  var mainPin = mapPins.querySelector('.map__pin--main');

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
    for (var i = 0; i < QUANTITY_OF_OBJECTS; i++) {
      fragment.appendChild(window.pin.renderAds(elementsArray[i]));
    }
    return mapPins.appendChild(fragment);
  };

  var onError = function (errorMessage) {
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

    mainPinY = parseInt((mainPinButton.style.top), 10) + ACTIVE_MAIN_PIN_HEIGHT;
    address.setAttribute('value', mainPinX + ', ' + mainPinY);
  };

  var notActivatedYet = true;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

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
  var mainPinButton = mapPins.querySelector('.map__pin--main');
  var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(MAIN_PIN_WIDTH / 2);
  var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(MAIN_PIN_HEIGHT / 2);

  address.setAttribute('value', mainPinX + ', ' + mainPinY);

  window.map = {
    adForm: adForm,
    adMap: adMap
  };
})();
