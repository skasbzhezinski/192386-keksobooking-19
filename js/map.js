'use strict';

(function () {
  var renderAds = function (adsArray) {
    var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var userPin = userPinTemplate.cloneNode(true);
    var userPinImg = adElement.querySelector('img');

    userPin.style.left = adsArray.location.x - window.data.PIN_WIDTH / 2 + 'px';
    userPin.style.top = adsArray.location.y + 'px';
    userPinImg.src = adsArray.author.avatar;
    userPinImg.alt = 'Заголовок объявления';

    return userPin;
  };

  var addElement = function (elementsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elementsArray.length; i++) {
      fragment.appendChild(renderAds(elementsArray[i]));
    }
    return fragment;
  };

  var insertElements = function () {
    window.data.mapPins.appendChild(addElement(window.data.mock));
  };

  var adMap = document.querySelector('.map');
  var notice = document.querySelector('.notice');

  var adForm = notice.querySelector('.ad-form');

  var disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters input');

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

  // функция активации страницы
  var activate = function () {
    insertElements();

    adForm.classList.remove('ad-form--disabled');
    adMap.classList.remove('map--faded');

    anableElements();

    mainPinY = parseInt((mainPinButton.style.top), 10) + window.data.ACTIVE_MAIN_PIN_HEIGHT;
    address.setAttribute('value', mainPinX + ', ' + mainPinY);
  };

  var mainPin = window.data.mapPins.querySelector('.map__pin--main');

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

  var address = notice.querySelector('#address');

  var mainPinButton = window.data.mapPins.querySelector('.map__pin--main');
  var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(window.data.MAIN_PIN_WIDTH / 2);
  var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(window.data.MAIN_PIN_HEIGHT / 2);

  address.setAttribute('value', mainPinX + ', ' + mainPinY);

  window.adForm = adForm;
  window.adMap = adMap;
})();
