'use strict';

(function () {

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    alert('данные получены успешно. статус ' + data.status);
    // console.log('данные получены успешно. статус ' + data.status);
  };

  // создаем новый объект xhr
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';
  xhr.timeout = 5000;

  // обработчик события срабатывающий когда сервер вернет ответ
  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onSuccess(xhr);
        break;

      default:
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  console.log('readyState - ', xhr.readyState);

  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

  console.log('readyState - ', xhr.readyState);
  console.log(window);

  window.load = {
    xhr: xhr
  };
})();
