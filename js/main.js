'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay

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
        price: Math.round(getRandomBetween(1000000, 0) / 1000) * 1000,
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

insertElements();

// =============  отладка  ============ //
// console.log('Добавляю метки объявлений ');
// console.log(mapPins);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 7. Личный проект: больше деталей (часть 2)

var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// записываем массив с данными для первого предложения в переменную
var firstAd = createSimilarAds(adTitles, housingAddresses, housingTypes,
    adDescriptions, adPhotoAddresses)[0];

// записываем клонированный шаблон в переменную
var popupCard = userCardTemplate.cloneNode(true);

// в каждый элемент шаблона записываем данные из сгенерированного массива
var popupTitle = popupCard.querySelector('.popup__title');
var popupAddress = popupCard.querySelector('.popup__text--address');

var popupPrice = popupCard.querySelector('.popup__text--price');
var popupType = popupCard.querySelector('.popup__type');
var popupTextCapacity = popupCard.querySelector('.popup__text--capacity');
var popupTextTime = popupCard.querySelector('.popup__text--time');
var popupFeatures = popupCard.querySelector('.popup__features');

// =============  отладка  ============ //
console.log(firstAd.offer.type);

popupTitle.textContent = firstAd.offer.title;
popupAddress.textContent = firstAd.offer.address;
popupPrice.textContent = firstAd.offer.price + '₽/ночь'; // ???
// popupType.textContent = firstAd.offer.type;

// функция создания текста для элемента popupTextCapacity
var getTextForCapacity = function (numberOfRooms, numberOfGuests) {
  var room;
  var guest;
  if (numberOfRooms > 1) {
    room = ' комнаты';
  } else {
    room = ' комната';
  }
  if (numberOfGuests > 1) {
    guest = ' гостей';
  } else {
    guest = ' гостя';
  }
  return firstAd.offer.rooms + room + ' для ' +
  firstAd.offer.guests + guest;
};

popupTextCapacity.textContent = getTextForCapacity(firstAd.offer.rooms, firstAd.offer.guests);

// функция выбора текста для элемента popupType
var getTextForType = function (typeOfHousing) {
  var text;
  switch (typeOfHousing) {
    case 'palace':
      text = 'Дворец';
      break;
    case 'flat':
      text = 'Квартира';
      break;
    case 'house':
      text = 'Дом';
      break;
    case 'bungalo':
      text = 'Бунгало';
      break;
    default:
      text = '';
      popupType.classList.add('visually-hidden');
  }
  return text;
};

popupType.textContent = getTextForType(firstAd.offer.type);

popupTextTime.textContent = 'Заезд после ' + firstAd.offer.checkin +
  ', выезд до ' + firstAd.offer.checkout;


// =============  отладка  ============ //
var firstFeature = popupFeatures.querySelector('.popup__feature:first-child');

// var firstFeatureName = firstFeature.slice(31);
// console.log(firstFeatureName)
// firstFeatureName = firstFeature.slice(0, 31);
// console.log(firstFeatureName)
// console.log(firstFeature.classList.contains('.popup__feature--wifi'));

console.log(firstFeature);
// console.log(firstFeature.classList);
// console.log(firstFeature.classList[1]);
// console.log(firstFeature.classList[1].slice(16));

// var listLength = popupFeatures.children.length;
// for (var j = 0; j < listLength; j++) {
//   for (var i = 0; i < firstAd.offer.features.length; i++) {
//     if (firstFeature.classList[1].slice(16) === firstAd.offer.features[i]) {
//       firstFeature.textContent = firstFeature.classList[1].slice(16);
//     } else {
//       firstFeature.classList.add('visually-hidden');
//     }
//   }
// }
console.log(firstAd.offer.features);

// var listLength = popupFeatures.children.length;
// for (var j = 1; j <= firstAd.offer.features.length; j++) {
//   for (var i = 0; i < listLength; i++) {
//     var lastWordInClassName = popupFeatures.querySelector('li:nth-child(' + j + ')').classList.value.slice(31);
//     var feature = firstAd.offer.features[i];
//     var condition = lastWordInClassName === feature;
//     var check = false;
//     if (condition) {
//       var item = popupFeatures.querySelector('li:nth-child(' + j + ')');
//       item.textContent = lastWordInClassName;
//       var check = true;
//     }
//   }
//   if (condition && !check) {
//     item.classList.add('visually-hidden');
//   }
// }

console.log(firstFeature);
console.log(popupFeatures);
console.log(popupCard);
// console.log(popupFeatures.children);
// console.log(popupFeatures.children.length);
// console.log(popupFeatures.children[3]);
// console.log(popupFeatures.querySelector('li:nth-child(' + (listLength - 1) + ')'));
// console.log(listLength);
// console.log('li:nth-child(' + (listLength - 1) + ')');
// console.log(popupFeatures.length); // undefined
