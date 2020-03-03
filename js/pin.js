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

    // var onUserPinOpenCard = function () {
    //   window.card.insertCard(adsArray);
    // };

    // userPin.addEventListener('click', onUserPinOpenCard);


    userPin.addEventListener('click', function () {
      var currentCurd = window.map.adMap.querySelector('.map__card');
      if (currentCurd) {
        currentCurd.remove();
      }
      window.card.insertCard(adsArray);
    });

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
    window.data.mapPins.appendChild(addElement(xhr.response));
  };

  window.pin = {
    insertElements: insertElements
  };
})();
