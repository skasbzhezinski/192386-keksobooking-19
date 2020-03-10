'use strict';

(function () {
  var renderAds = function (adsArray) {
    var PIN_WIDTH = 50; // ширина метки
    var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var userPin = userPinTemplate.cloneNode(true);
    var userPinImg = userPin.querySelector('img');

    userPin.style.left = adsArray.location.x - PIN_WIDTH / 2 + 'px';
    userPin.style.top = adsArray.location.y + 'px';
    userPinImg.src = adsArray.author.avatar;
    userPinImg.alt = 'Заголовок объявления';

    // добавление карточки по клику на метке
    userPin.addEventListener('click', function () {
      if (window.map.adMap.querySelector('.map__card')) {
        window.map.adMap.querySelector('.map__card').remove();
      }

      window.card.insertCard(adsArray);

      // удаление карточки по клику на popupClose
      var popupClose = window.map.adMap.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        window.map.adMap.querySelector('.map__card').remove();
      });
    });

    return userPin;
  };

  window.pin = {
    renderAds: renderAds
  };
})();
