'use strict';

var num = 19; // временно, чтоб линтер не ругался
var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WITH = 1200; // ширина блока .map__overlay

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

// var createsimilarAds = function (quantity) {
var similarAds = [];
for (var i = 0; i < quantityOfObjects; i++) {
  similarAds[i] = {
    author: {
      avatar: 'img/avatars/user0' + getRandomBetween(8, 1) + '.png'
    }, // где {{xx}} это число от 1 до 8 с ведущим нулём.
    // Например, 01, 02 и т. д. Адреса изображений не повторяются

    offer: {
      title: 'BLAH!', // строка, заголовок предложения
      address: '600, 350', // строка, адрес предложения. Для простоты пусть пока представляет собой
      // запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      price: num, // число, стоимость
      type: '', // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      rooms: num, // число, количество комнат
      guests: num, // число, количество гостей, которое можно разместить
      checkin: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      checkout: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      // массив строк случайной длины из ниже предложенных:
      description: '', // строка с описанием
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel' + num + '.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ], // массив строк случайной длины, содержащий адреса фотографий
    },

    location: {
      x: getRandomBetween(0, MAP_WITH), // случайное число, координата x метки на карте.
      // Значение ограничено размерами блока, в котором перетаскивается метка = 1200
      y: getRandomBetween(630, 130), // случайное число, координата y метки на карте от 130 до 630
    }
  };
}

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var userPin = document.querySelector('#pin').content.querySelector('.map__pin');

userPin.style.left = similarAds[0].location.x - PIN_WIDTH / 2 + 'px';
userPin.style.top = similarAds[0].location.y + 'px';

var userPinImg = userPin.querySelector('img');

userPinImg.src = similarAds[0].author.avatar;
userPinImg.alt = 'Заголовок объявления';

var userPinList = document.querySelector('.map__pins');
var userPinElement = userPin.cloneNode(true);
userPinList.appendChild(userPinElement);
