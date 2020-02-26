'use strict';

(function () {
  var renderAds = function (adsArray) {
    var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var userPin = userPinTemplate.cloneNode(true);
    var userPinImg = userPin.querySelector('img');

    userPin.style.left = adsArray.location.x - window.data.PIN_WIDTH / 2 + 'px';
    userPin.style.top = adsArray.location.y + 'px';
    userPinImg.src = adsArray.author.avatar;
    userPinImg.alt = 'Заголовок объявления';

    // =================== //
    // console.log(userPin);

    var onUserPinOpenCard = function () {
      window.insertCard(adsArray);
    };
    userPin.addEventListener('click', onUserPinOpenCard);

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

  window.insertElements = insertElements;
})();
