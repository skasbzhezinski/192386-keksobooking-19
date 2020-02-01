'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay

var proposedFeatures = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

// массивы
var titles = [
  'Милая, уютная квартирка в центре Токио',
  'Квартира в жилом комплексе бизнес-класса',
  'Срочно сдается 2-комнатная квартира',
  'Апартамент с готовым премиум-ремонтом в современном стиле!',
  'Сдаются 3-комнатные апартаменты',
  'Сдается теплая, солнечная квартира',
  'Квартира сдается с мебелью и техникой!',
  'Сдаю студию 12,5 кв. м.'
];

var addresses = [
  '600, 350',
  '540, 210',
  '119, 590',
  '26, 496',
  '232, 100',
  '503, 40',
  '360, 360',
  '540, 165'
];

var types = [
  'palace', 'flat', 'house', 'bungalo'
];

var arrivalTimes = [
  '12:00', '13:00', '14:00'
];

var descriptions = [
  ''
];

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

// функция работает не корректно
var getRandomLengthArr = function (arr) {
  var newArr = [];
  newArr[0] = arr[getRandomBetween(arr.length - 1, 0)];
  var newArrLength = getRandomBetween(arr.length, 1);

  for (var i = 1; i < newArrLength; i++) {
    var interim = arr[getRandomBetween(arr.length - 1, 0)];
    console.log('interim');
    if (interim !== newArr[i - 1]) {
      newArr[i] = interim;
    }
  }
  console.log('длина нового массива');
  console.log(newArrLength);
  return newArr;
};

console.log(getRandomLengthArr(proposedFeatures));

var createSimilarAds = function () {
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
        description: '', // строка с описанием
        photos: [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ], // массив строк случайной длины, содержащий адреса фотографий
      },

      location: {
        x: getRandomBetween(0, MAP_WIDTH),
        y: getRandomBetween(630, 130),
      }
    };

    // ============== отладка ============== //
    console.log(similarAds[i].offer.title);
    console.log(similarAds[i].offer.address);
    console.log(similarAds[i].offer.type);
    console.log(similarAds[i].offer.rooms);
    console.log(similarAds[i].offer.checkin);
    console.log(similarAds[i].offer.checkout);
    console.log(similarAds[i].offer.features);
  }
  return similarAds;
};

var ads = createSimilarAds();

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var userPinImg = userPinTemplate.querySelector('img');

for (var i = 0; i < 8; i++) {
  userPinTemplate.style.left = ads[i].location.x - PIN_WIDTH / 2 + 'px';
  userPinTemplate.style.top = ads[i].location.y + 'px';

  userPinImg.src = ads[i].author.avatar;
  userPinImg.alt = 'Заголовок объявления';

  var userPinList = document.querySelector('.map__pins');
  var userPinElement = userPinTemplate.cloneNode(true);
  userPinList.appendChild(userPinElement);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// временно активировать секцию notice
document.querySelector('.ad-form').classList.remove('ad-form--disabled');
