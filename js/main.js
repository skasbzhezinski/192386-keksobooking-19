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

// Активация страницы

var adMap = document.querySelector('.map');
var notice = document.querySelector('.notice');

var adForm = notice.querySelector('.ad-form');

var adFormElements = adForm.querySelectorAll('.ad-form fieldset');
var filterElements = adMap.querySelectorAll('.map__filters select, .map__filters input');

var disableMapFilterElements = function () {
  for (var i = 0; i < filterElements.length; i++) {
    filterElements[i].setAttribute('disabled', '');
  }
};

var disableAdFormElements = function () {
  for (var j = 0; j < adFormElements.length; j++) {
    adFormElements[j].setAttribute('disabled', '');
  }
};

var anableAdFormElements = function () {
  for (var j = 0; j < adFormElements.length; j++) {
    adFormElements[j].removeAttribute('disabled');
  }
};

var anableMapFilterElements = function () {
  for (var i = 0; i < filterElements.length; i++) {
    filterElements[i].removeAttribute('disabled');
  }
};

disableMapFilterElements(); // по дефолту запущена, переопределяется при активации
disableAdFormElements(); // по дефолту запущена, переопределяется при активации


var activate = function () {
  insertElements();

  adForm.classList.remove('ad-form--disabled');
  adMap.classList.remove('map--faded');

  anableMapFilterElements();
  anableAdFormElements();

  mainPinY = parseInt((mainPinButton.style.top), 10) + ACTIVE_MAIN_PIN_HEIGHT;
  address.setAttribute('value', mainPinX + ', ' + mainPinY);
};

// var mainPin = mapPins.querySelector('.map__pin--main');

// var numberOfActivations = 0; // счетчик активаций
// mainPin.addEventListener('mousedown', function (evt) {
//   if (evt.button === 0 && numberOfActivations === 0) {
//     activate();
//     numberOfActivations++;
//   }
// });

var mainPin = mapPins.querySelector('.map__pin--main');

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

var mainPinButton = mapPins.querySelector('.map__pin--main');
var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(MAIN_PIN_WIDTH / 2);
var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(MAIN_PIN_HEIGHT / 2);

address.setAttribute('value', mainPinX + ', ' + mainPinY);

// Непростая валидация

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

// var message = [
//   'Количество мест не должно превышать количество комнат',
//   '100 комнат не для гостей',
//   ''
// ];

// roomNumber.addEventListener('change', function () {
//   if ((roomNumber.value < capacity.value && roomNumber.value !== '100')
//   || (roomNumber.value === '100' && capacity.value !== '0')) {
//     roomNumber.setCustomValidity(message[0]);
//   }
//   roomNumber.setCustomValidity(message[2]);
// });

var message = '';
roomNumber.addEventListener('change', function () {
  if (parseInt(roomNumber.value, 10) < parseInt(capacity.value, 10) && roomNumber.value !== '100') {
    message = 'Количество мест не должно превышать количество комнат';
    roomNumber.setCustomValidity(message);
  } else if (roomNumber.value === '100' && parseInt(capacity.value, 10) > 0) {
    message = 'другое';
    roomNumber.setCustomValidity(message);
  } else if (roomNumber.value === '100' && parseInt(capacity.value, 10) === 0) {
    message = '';
    roomNumber.setCustomValidity(message);
  }
});

// var message = '';
// roomNumber.addEventListener('change', function () {
//   if (roomNumber.value < capacity.value || (roomNumber.value === '100' && capacity.value > '0')) {
//     message = 'Количество мест не должно превышать количество комнат. 100 комнат не для гостей';
//     roomNumber.setCustomValidity(message);
//     capacity.setCustomValidity(message);
//   } else {
//     message = '';
//   }
// });

// console.log(typeof roomNumber.value);
// console.log(roomNumber.value < capacity.value);
// console.log(roomNumber.value < capacity.value || (roomNumber.value === '100' && capacity.value === '0'));

// capacity.addEventListener('change', function () {
//   if (roomNumber.value === '1' && (capacity.value === '0' ||
//     capacity.value === '2' || capacity.value === '3')) {
//     roomNumber.setCustomValidity('Количество мест не должно превышать количество комнат. Выберите "для 1 гостя" в поле справа');
//     capacity.setCustomValidity('Количество мест не должно превышать количество комнат. Выберите "для 1 гостя"');
//   } else {
//     roomNumber.setCustomValidity('');
//     capacity.setCustomValidity('');
//   }
// });
