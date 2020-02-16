'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay
var MAIN_PIN_WIDTH = 65; // равна высоте в неактивном состоянии
var MAIN_PIN_HEIGHT = 65;
var ACTIVE_MAIN_PIN_HEIGHT = 84;

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

// массивы
var adTitles = [
  'Милая, уютная квартирка в центре Токио',
  'Квартира в жилом комплексе бизнес-класса',
  'Срочно сдается 2-комнатная квартира',
  'Апартамент с готовым премиум-ремонтом в современном стиле!',
  'Квартира с террасой',
  'Сдается теплая, солнечная квартира',
  'Квартира сдается с мебелью и техникой!',
  'Сдаю студию 12,5 кв. м.'
];

var housingAddresses = [
  '600, 350',
  '540, 210',
  '119, 590',
  '26, 496',
  '232, 100',
  '503, 40',
  '360, 360',
  '540, 165'
];

var housingTypes = [
  'palace', 'flat', 'house', 'bungalo'
];

var arrivalTimes = [
  '12:00', '13:00', '14:00'
];

var proposedFeatures = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

var adDescriptions = [
  'На длительный срок сдается роскошная двухкомнатна квартира с дизайнерским ремонтом',
  'Только что построенная и отделанная квартира',
  'В аренду на длительный срок предлагается двухкомнатная квартира',
  'В зеленом районе столицы предлагается современная квартира',
  'Светлая и просторная трехкомнатная квартира с отделкой в современном стиле',
  'В аренду предлагается великолепная светлая 3-х комнатная квартира со свежим ремонтом.',
  'Великолепная трехкомнатная квартира по индивидуальному дизайн-проекту',
  'Предлагаем светлую, просторную, современную студию в одном из лучших и стильных районов столицы'
];

var adPhotoAddresses = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomLengthArr = function (array) {
  var newArr = [];
  var newLength = getRandomBetween(array.length, 0);
  for (var i = 0; i < newLength; i++) {
    newArr[i] = array[i];
  }
  return newArr;
};

var createSimilarAds = function (titles, addresses, types, descriptions, photoAddresses) {
  var similarAds = [];
  for (var i = 0; i < quantityOfObjects; i++) {
    var checkinTime = arrivalTimes[getRandomBetween(2, 0)];
    var checkoutTime = arrivalTimes[getRandomBetween(2, 0)];
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: titles[i],
        address: addresses[i],
        price: Math.round(getRandomBetween(10000, 0) / 100) * 100, // выглядит реальнее
        type: types[getRandomBetween(types.length - 1, 0)],
        rooms: getRandomBetween(3, 1),
        guests: getRandomBetween(3, 1),
        checkin: checkinTime,
        checkout: checkoutTime,
        features: getRandomLengthArr(proposedFeatures),
        description: descriptions[i],
        photos: getRandomLengthArr(photoAddresses)
      },

      location: {
        x: getRandomBetween(0, MAP_WIDTH),
        y: getRandomBetween(630, 130),
      }
    };
  }
  return similarAds;
};

var renderAds = function (adsArray) {
  var adElement = userPinTemplate.cloneNode(true);
  var adElementImg = adElement.querySelector('img');

  adElement.style.left = adsArray.location.x - PIN_WIDTH / 2 + 'px';
  adElement.style.top = adsArray.location.y + 'px';
  adElementImg.src = adsArray.author.avatar;
  adElementImg.alt = 'Заголовок объявления';

  return adElement;
};

var addElement = function (elementsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elementsArray.length; i++) {
    fragment.appendChild(renderAds(elementsArray[i]));
  }
  return fragment;
};

var insertElements = function () {
  mapPins.appendChild(addElement(createSimilarAds(adTitles, housingAddresses, housingTypes,
      adDescriptions, adPhotoAddresses)));
};

// 9. Личный проект: доверяй, но проверяй (часть 1)
// Активация страницы

var adMap = document.querySelector('.map');
var notice = document.querySelector('.notice');

var adForm = notice.querySelector('.ad-form');

// var adFormElements = adForm.querySelectorAll('.ad-form fieldset');
// var filterElements = adMap.querySelectorAll('.map__filters select, .map__filters input');
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

  mainPinY = parseInt((mainPinButton.style.top), 10) + ACTIVE_MAIN_PIN_HEIGHT;
  address.setAttribute('value', mainPinX + ', ' + mainPinY);
};

var mainPin = mapPins.querySelector('.map__pin--main');

var notActivatedYet = true;
mainPin.addEventListener('mousedown', function (evt) {
  if (notActivatedYet === false) {
    return;
  }
  if (evt.button === 0) {
    activate();
    notActivatedYet = false;

    // вызов карточки по клику на метке
    var mapPin = mapPins.querySelectorAll('.map__pin');
    var onMapPinClick = function () {
      insertCard();
    };

    mapPin[6].addEventListener('click', onMapPinClick);
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

var mainPinButton = mapPins.querySelector('.map__pin--main');
var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(MAIN_PIN_WIDTH / 2);
var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(MAIN_PIN_HEIGHT / 2);

address.setAttribute('value', mainPinX + ', ' + mainPinY);

// Непростая валидация

// обработчик события 'change' на форме
var onAdFormChange = function () {
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var message = [
    'Количество мест не должно превышать количество комнат',
    '100 комнат не для гостей',
    'Укажите количество мест',
    ''
  ];

  if ((roomNumber.value === '100') && (capacity.value !== '0')) {
    roomNumber.setCustomValidity(message[1]);
  } else if (roomNumber.value < capacity.value) {
    roomNumber.setCustomValidity(message[0]);
  } else if (roomNumber.value !== '100' && capacity.value === '0') {
    roomNumber.setCustomValidity(message[2]);
  } else {
    roomNumber.setCustomValidity(message[3]);
  }
};

// запуск валидации по событию 'change' на форме
adForm.addEventListener('change', onAdFormChange);

// 7. Личный проект: больше деталей (часть 2)

var renderCard = function () {
  var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // записываем массив с данными для первого предложения в переменную
  var firstAd = createSimilarAds(adTitles, housingAddresses, housingTypes,
      adDescriptions, adPhotoAddresses)[5];

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

  // функция создания текста для элемента popupTextCapacity
  var getTextForCapacity = function (numberOfRooms, numberOfGuests) {
    var id;
    var pluralNominative = function (n, forms) {
      if (n % 10 === 1 && n % 100 !== 11) {
        id = 0;
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        id = 1;
      } else {
        id = 2;
      }
      return forms[id] || '';
    };

    var pluralGenitive = function (n, forms) {
      if (n === 1) {
        id = 0;
      } else {
        id = 1;
      }
      return forms[id];
    };

    var room = pluralNominative(numberOfRooms, ['комната', 'комнаты', 'комнат']);
    var guest = pluralGenitive(numberOfGuests, ['гостя', 'гостей']);

    return firstAd.offer.rooms + room + ' для ' +
      firstAd.offer.guests + guest;
  };
  popupTextCapacity.textContent = getTextForCapacity(firstAd.offer.rooms, firstAd.offer.guests);

  var houseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  popupType.textContent = houseType[firstAd.offer.type];

  popupTextTime.textContent = 'Заезд после ' + firstAd.offer.checkin +
  ', выезд до ' + firstAd.offer.checkout;

  // функция добавления текста пунктам списка popupFeatures
  var addFeaturesToTheList = function () {
    var INDEX_OF_LAST_WORD_IN_CLASS_NAME = 31;
    var listLength = popupFeatures.children.length;
    for (var j = 1; j <= listLength; j++) {
      var lastWordInClassName = popupFeatures.querySelector('li:nth-child(' + j + ')')
        .classList.value.slice(INDEX_OF_LAST_WORD_IN_CLASS_NAME);
      var item = popupFeatures.querySelector('li:nth-child(' + j + ')');
      var matchCheck = false;
      for (var i = 0; i < firstAd.offer.features.length; i++) {
        var feature = firstAd.offer.features[i];
        if (lastWordInClassName === feature) {
          matchCheck = true;
        }
      }
      if (matchCheck === true) {
        item.textContent = lastWordInClassName;
      } else {
        item.classList.add('visually-hidden');
      }
    }
  };
  // запускаем функцию
  addFeaturesToTheList();

  popupDescriptions.textContent = firstAd.offer.description;
  popupAvatar.setAttribute('src', firstAd.author.avatar);

  // функция добавления элементов img в блок popupPhotos
  var addImgToTheList = function () {
    var img = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(img);
    var insertedImg;
    for (var num = 0; num < firstAd.offer.photos.length; num++) {
      insertedImg = img.cloneNode(true);
      insertedImg.setAttribute('src', firstAd.offer.photos[num]);
      popupPhotos.appendChild(insertedImg);
    }
  };
  // запускаем
  addImgToTheList();

  return popupCard;
};

// функция вставки карточки в DOM
var insertCard = function () {
  var mapfiltersContainer = adMap.querySelector('.map__filters-container');
  adMap.insertBefore(renderCard(), mapfiltersContainer);
};

// ============== отладка ============== //
// вставляем карточку
// insertCard();

// console.log(firstAd);
// console.log(mapPins);
