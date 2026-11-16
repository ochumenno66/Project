'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePrice: 0,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  discount: '',

  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.discount = appData.getRollbackMessage(appData.fullPrice);
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    this.logger();
  },

  // функция проверки на число (true / false)
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  // задает вопросы пользователю
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    appData.screens = prompt(
      'Какие типы экранов нужно разработать?',
      'Простые',
    );

    // Пока введённое значение НЕ является числом, снова спрашивать пользователя стоимость
    do {
      appData.screenPrice = prompt(
        'Сколько будет стоить данная работа?',
        '123',
      );
    } while (!appData.isNumber(appData.screenPrice));
    //appData.screenPrice = parseFloat(appData.screenPrice);
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  // собирает стоимости доп услуг и складывает их
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt(
          'Какой дополнительный тип услуги нужен?',
          'Метрика',
        );
      } else if (i === 1) {
        appData.service2 = prompt(
          'Какой дополнительный тип услуги нужен?',
          'CMS',
        );
      }

      do {
        appData.servicePrice = prompt('Сколько это будет стоить?', '12');
      } while (!appData.isNumber(appData.servicePrice));

      sum += Number(appData.servicePrice);
    }
    return sum;
  },

  // считает общую стоимость
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },

  // итоговая стоимость с учётом отката
  getServicePercentPrices: function () {
    return Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },

  // форматирует название
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase()
    );
  },

  // определяет размер скидки
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что то пошло не так';
    }
  },

  /*logger: function () {
    for (let key in appData) {
      console.log('Ключ: ' + key + ', Значение:' + appData[key]);
    }
  },*/
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
  },
};

// запуск функций
appData.start();
