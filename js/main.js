'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay
var MAIN_PIN_WIDTH = 65; // равна высоте в неактивном состоянии
var MAIN_PIN_HEIGHT = 84;

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
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: titles[i],
        address: addresses[i],
        price: Math.round(getRandomBetween(1000000, 0) / 1000) * 1000,
        type: types[getRandomBetween(types.length - 1, 0)],
        rooms: getRandomBetween(10, 1),
        guests: getRandomBetween(10, 1),
        checkin: checkinTime,
        checkout: checkinTime,
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
  mapPins.appendChild(addElement(createSimilarAds(adTitles, housingAddresses, housingTypes, adDescriptions, adPhotoAddresses)));
};

var map = document.querySelector('.map');
var notice = document.querySelector('.notice');

var adForm = notice.querySelector('.ad-form');

var adFormElements = adForm.querySelectorAll('.ad-form fieldset');
var filterSelects = map.querySelectorAll('.map__filter');
var housingFeatures = map.querySelectorAll('.map__checkbox');

var disableMapFilterElements = function () {
  for (var i = 0; i < filterSelects.length; i++) {
    filterSelects[i].disabled = true;
  }
  for (var j = 0; j < housingFeatures.length; j++) {
    housingFeatures[j].disabled = true;
  }
};

var anableMapFilterElements = function () {
  for (var i = 0; i < filterSelects.length; i++) {
    filterSelects[i].disabled = false;
  }
  for (var j = 0; j < housingFeatures.length; j++) {
    housingFeatures[j].disabled = false;
  }
};

var disableAdFormElements = function () {
  for (var j = 0; j < adFormElements.length; j++) {
    adFormElements[j].disabled = true;
  }
};

disableMapFilterElements(); // по дефолту запущена, переопределяется при активации
disableAdFormElements(); // по дефолту запущена, переопределяется при активации

var anableAdFormElements = function () {
  for (var j = 0; j < adFormElements.length; j++) {
    adFormElements[j].disabled = false;
  }
};

var activate = function () {
  insertElements();

  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');

  anableMapFilterElements();
  anableAdFormElements();

  mainPinY = parseInt((mainPinButton.style.top), 10) + MAIN_PIN_HEIGHT;
  address.setAttribute('value', mainPinX + ', ' + mainPinY);
};

var mainPin = mapPins.querySelector('.map__pin--main');

var numberOfActivations = 0; // счетчик активаций
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0 && numberOfActivations === 0) {
    activate();
    numberOfActivations++;
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && numberOfActivations === 0) {
    activate();
    numberOfActivations++;
  }
});

var address = notice.querySelector('#address');

var mainPinButton = mapPins.querySelector('.map__pin--main');
var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(MAIN_PIN_WIDTH / 2);
var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(MAIN_PIN_WIDTH / 2);

address.setAttribute('value', mainPinX + ', ' + mainPinY);
