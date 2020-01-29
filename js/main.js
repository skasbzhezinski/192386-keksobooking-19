'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

var createSimilarAds = function () {
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
        price: '', // число, стоимость
        type: '', // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
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

var similarAds = createSimilarAds();
// ============== отладка ============== //

console.log(similarAds);
console.log(similarAds[0]);
console.log(similarAds[0].author);
console.log(similarAds[0].location);
console.log(similarAds[0].location.x);
console.log(similarAds[0].author.avatar);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

//userPinTemplate.style.left = similarAds[0].location.x - PIN_WIDTH / 2 + 'px';
userPinTemplate.style.top = similarAds[0].location.y + 'px';

var userPinImg = userPinTemplate.querySelector('img');

userPinImg.src = similarAds[0].author.avatar;
userPinImg.alt = 'Заголовок объявления';

var userPinList = document.querySelector('.map__pins');
var userPinElement = userPinTemplate.cloneNode(true);
userPinList.appendChild(userPinElement);
