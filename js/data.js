'use strict';

(function () {
  var quantityOfObjects = 8;
  // var PIN_HEIGHT = 70; // высота метки
  var PIN_WIDTH = 50; // ширина метки
  var MAP_WIDTH = 1200; // ширина блока .map__overlay
  var MAIN_PIN_WIDTH = 65; // равна высоте в неактивном состоянии
  var MAIN_PIN_HEIGHT = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 84;

  var HOUSE_TYPE = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

  var mock = createSimilarAds(adTitles, housingAddresses, housingTypes,
      adDescriptions, adPhotoAddresses);

  window.data = {
    PIN_WIDTH: PIN_WIDTH,
    MAP_WIDTH: MAP_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    ACTIVE_MAIN_PIN_HEIGHT: ACTIVE_MAIN_PIN_HEIGHT,
    HOUSE_TYPE: HOUSE_TYPE,
    TYPES: TYPES,
    mapPins: mapPins,
    mock: mock
  };
})();
