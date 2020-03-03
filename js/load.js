'use strict';

// создаем новый объект xhr
var xhr = new XMLHttpRequest();

// обработчик события срабатывающий когда сервер вернет ответ
xhr.responseType = 'json';

xhr.addEventListener('load', function () {

  // ============= //
  console.log(xhr.response);
  console.log(xhr.response[0]);
  console.log(xhr.response[0].author);
  console.log(xhr.response[0].author.avatar);
  console.log(typeof xhr.response[0].author.avatar);
});

console.log('readyState - ', xhr.readyState);

xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

console.log('readyState - ', xhr.readyState);

xhr.send();

console.log('readyState - ', xhr.readyState);
