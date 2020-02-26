'use strict';

(function () {
  var renderCard = function () {
    var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    // записываем массив с данными для первого предложения в переменную
    var firstAd = window.data.mock[0];

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
    popupTitle.textContent = firstAd.offer.title;
    popupAddress.textContent = firstAd.offer.address;
    popupPrice.textContent = firstAd.offer.price + '₽/ночь'; // ???

    // функция выбора окончаний
    var plural = function (n, forms) {
      var id;
      if (n % 10 === 1 && n % 100 !== 11) {
        id = 0;
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        id = 1;
      } else {
        id = 2;
      }
      return forms[id] || '';
    };

    var room = plural(firstAd.offer.rooms, [' комната', ' комнаты', ' комнат']);
    var guest = plural(firstAd.offer.guests, [' гостя', ' гостей', ' гостей']);

    popupTextCapacity.textContent = firstAd.offer.rooms + room + ' для ' +
    firstAd.offer.guests + guest;

    popupType.textContent = window.data.HOUSE_TYPE[firstAd.offer.type];

    popupTextTime.textContent = 'Заезд после ' + firstAd.offer.checkin +
    ', выезд до ' + firstAd.offer.checkout;

    // вывод доступных удобств

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    for (var i = 0; i < firstAd.offer.features.length; i++) {
      var item = document.createElement('li');
      item.setAttribute('class', 'popup__feature popup__feature--' + window.data.TYPES[i]);
      popupFeatures.appendChild(item);
    }

    popupDescriptions.textContent = firstAd.offer.description;
    popupAvatar.setAttribute('src', firstAd.author.avatar);

    // добавление фотографий в блок popupPhotos
    var img = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(img);
    var insertedImg;
    for (var num = 0; num < firstAd.offer.photos.length; num++) {
      insertedImg = img.cloneNode(true);
      insertedImg.setAttribute('src', firstAd.offer.photos[num]);
      popupPhotos.appendChild(insertedImg);
    }
    return popupCard;
  };

  // функция вставки карточки в DOM
  var insertCard = function () {
    var mapfiltersContainer = window.adMap.querySelector('.map__filters-container');
    window.adMap.insertBefore(renderCard(), mapfiltersContainer);
  };

  // вставляем карточку
  insertCard();
})();
