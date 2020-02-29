'use strict';

(function () {
  var renderCard = function (mockData) {
    var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    // записываем массив с данными для первого предложения в переменную
    // var firstAd = window.data.mock[0];

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
    popupTitle.textContent = mockData.offer.title;
    popupAddress.textContent = mockData.offer.address;
    popupPrice.textContent = mockData.offer.price + '₽/ночь'; // ???

    var room = window.plural(mockData.offer.rooms, [' комната', ' комнаты', ' комнат']);
    var guest = window.plural(mockData.offer.guests, [' гостя', ' гостей', ' гостей']);

    popupTextCapacity.textContent = mockData.offer.rooms + room + ' для ' +
    mockData.offer.guests + guest;

    popupType.textContent = window.data.HOUSE_TYPE[mockData.offer.type];

    popupTextTime.textContent = 'Заезд после ' + mockData.offer.checkin +
    ', выезд до ' + mockData.offer.checkout;

    // вывод доступных удобств

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    for (var i = 0; i < mockData.offer.features.length; i++) {
      var item = document.createElement('li');
      item.setAttribute('class', 'popup__feature popup__feature--' + window.data.TYPES[i]);
      popupFeatures.appendChild(item);
    }

    popupDescriptions.textContent = mockData.offer.descriptions;
    popupAvatar.setAttribute('src', mockData.author.avatar);

    // добавление фотографий в блок popupPhotos
    var img = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(img);
    var insertedImg;
    for (var num = 0; num < mockData.offer.photos.length; num++) {
      insertedImg = img.cloneNode(true);
      insertedImg.setAttribute('src', mockData.offer.photos[num]);
      popupPhotos.appendChild(insertedImg);
    }
    return popupCard;
  };

  // функция вставки карточки в DOM
  var insertCard = function (data) {
    var mapfiltersContainer = window.adMap.querySelector('.map__filters-container');
    window.adMap.insertBefore(renderCard(data), mapfiltersContainer);
  };

  window.insertCard = insertCard;
})();
