'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

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

var times = [
  '12:00', '13:00', '14:00'
];

var proposedFeatures = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

var descriptions = [
  ''
];

var createSimilarAds = function () {
  var similarAds = [];
  for (var i = 0; i < quantityOfObjects; i++) {
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: titles[i],
        address: addresses[i],
        price: Math.round(getRandomBetween(1000000, 0) / 1000) * 1000,
        type: types[getRandomBetween(types.length - 1, 0)], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: '', // число, количество комнат
        guests: '', // число, количество гостей, которое можно разместить
        checkin: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        checkout: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        // массив строк случайной длины из ниже предложенных:
        description: '', // строка с описанием
        photos: [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ], // массив строк случайной длины, содержащий адреса фотографий
      },

      location: {
        x: getRandomBetween(0, MAP_WIDTH), // случайное число, координата x метки на карте.
        // Значение ограничено размерами блока, в котором перетаскивается метка = 1200
        y: getRandomBetween(630, 130), // случайное число, координата y метки на карте от 130 до 630
      }
    };
  }
  return similarAds;
};

// ============== отладка ============== //
console.log(createSimilarAds()[2].offer.title);
console.log(createSimilarAds()[3].offer.address);
console.log(createSimilarAds()[3].offer.type);


var ads = createSimilarAds();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
// временно активировать секцию notice
document.querySelector('.ad-form').classList.remove('ad-form--disabled');
