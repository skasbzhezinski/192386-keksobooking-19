'use strict';

(function () {
// Непростая валидация

  // обработчик события 'change' на форме
  var onAdFormChange = function () {
    var roomNumber = window.map.adForm.querySelector('#room_number');
    var capacity = window.map.adForm.querySelector('#capacity');

    // количество комнат -- количество гостей
    roomNumber.setCustomValidity('');
    if ((roomNumber.value === '100') && (capacity.value !== '0')) {
      roomNumber.setCustomValidity('100 комнат не для гостей');
    } else if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity('Количество мест не должно превышать количество комнат');
    } else if (roomNumber.value !== '100' && capacity.value === '0') {
      roomNumber.setCustomValidity('Укажите количество мест');
    }
  };

  // запуск валидации по событию 'change' на форме
  window.map.adForm.addEventListener('change', onAdFormChange);

})();
