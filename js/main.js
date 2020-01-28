'use strict';

var num = 19; // чтоб линтер не ругался
var similarAds = [
  {
    author: {
      avatar: 'img/avatars/user**{{xx}}**.png'
    } // где {{xx}} это число от 1 до 8 с ведущим нулём.
    // Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
  {
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
    }
  },
  {
    location: {
      x: num, // случайное число, координата x метки на карте.
      // Значение ограничено размерами блока, в котором перетаскивается метка = 1200
      y: num, // случайное число, координата y метки на карте от 130 до 630
    }
  }
];


var map = document.querySelector('.map');

map.classList.remove('map--faded');

var userPin = document.querySelector('#pin').content.querySelector('.map__pin');
// ============== ОТЛАДКА ============== //
console.log(userPin);

var userPinList = document.querySelector('.map__pins');
var userPinElement = userPin.cloneNode(true);
userPinList.appendChild(userPinElement);
// ============== ОТЛАДКА ============== //
console.log(userPinList);
console.log(similarAds.length);

var getRandomBetween = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// ============== ОТЛАДКА ============== //
console.log(getRandomBetween(630, 130));
