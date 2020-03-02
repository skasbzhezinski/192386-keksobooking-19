'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open('GET', url);
    xhr.send();
  };
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log('data');
    console.log(data);
  };
  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

})();

// var onError = function (message) {
//   console.error(message);
// };

// var onSuccess = function (data) {
//   console.log('data');
//   console.log(data);
// };
// window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
console.log(window.load.data);
