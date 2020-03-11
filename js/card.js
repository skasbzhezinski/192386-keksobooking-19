'use strict';

(function () {
  var renderCard = function (serverData) {
    var HOUSE_TYPE = {
      palace: 'Дворец',
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };
    var TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    // записываем клонированный шаблон в переменную
    var popupCard = userCardTemplate.cloneNode(true);

    // создаем переменные для элементов карточки popupCard
    var popupTitle = popupCard.querySelector('.popup__title');
    var popupAddress = popupCard.querySelector('.popup__text--address');
    var popupPrice = popupCard.querySelector('.popup__text--price');
    var popupType = popupCard.querySelector('.popup__type');
    var popupTextCapacity = popupCard.querySelector('.popup__text--capacity');
    var popupTextTime = popupCard.querySelector('.popup__text--time');
    var popupFeatures = popupCard.querySelector('.popup__features');
    var popupDescriptions = popupCard.querySelector('.popup__description');
    var popupPhotos = popupCard.querySelector('.popup__photos');
    var popupAvatar = popupCard.querySelector('.popup__avatar');

    // в каждый элемент карточки записываем данные из сгенерированного массива
    popupTitle.textContent = serverData.offer.title;
    popupAddress.textContent = serverData.offer.address;
    popupPrice.textContent = serverData.offer.price + '₽/ночь'; // ???

    var room = window.util.plural(serverData.offer.rooms, [' комната', ' комнаты', ' комнат']);
    var guest = window.util.plural(serverData.offer.guests, [' гостя', ' гостей', ' гостей']);

    popupTextCapacity.textContent = serverData.offer.rooms + room + ' для ' +
    serverData.offer.guests + guest;

    popupType.textContent = HOUSE_TYPE[serverData.offer.type];

    popupTextTime.textContent = 'Заезд после ' + serverData.offer.checkin +
    ', выезд до ' + serverData.offer.checkout;

    // вывод доступных удобств
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    for (var i = 0; i < serverData.offer.features.length; i++) {
      var item = document.createElement('li');
      item.setAttribute('class', 'popup__feature popup__feature--' + TYPES[i]);
      popupFeatures.appendChild(item);
    }

    popupDescriptions.textContent = serverData.offer.descriptions;
    popupAvatar.setAttribute('src', serverData.author.avatar);

    // добавление фотографий в блок popupPhotos
    var img = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(img);
    var insertedImg;
    for (var num = 0; num < serverData.offer.photos.length; num++) {
      insertedImg = img.cloneNode(true);
      insertedImg.setAttribute('src', serverData.offer.photos[num]);
      popupPhotos.appendChild(insertedImg);
    }
    return popupCard;
  };

  // функция вставки карточки в DOM
  var insertCard = function (data) {
    var mapfiltersContainer = window.map.adMap.querySelector('.map__filters-container');
    window.map.adMap.insertBefore(renderCard(data), mapfiltersContainer);
  };

  window.card = {
    insertCard: insertCard
  };
})();
