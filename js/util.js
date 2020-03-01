'use strict';

(function () {
  // функция выбора окончаний
  var plural = function (n, forms) {
    var id;
    if (n % 10 === 1 && n % 100 !== 11) {
      id = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      id = 1;
    } else {
      id = 2;
    }
    return forms[id] || '';
  };

  window.util = {
    plural: plural
  };
})();
