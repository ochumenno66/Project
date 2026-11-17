'use strict';

const title = document.getElementsByTagName('h1')[0];

const calcBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const screenBtn = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const rangeInput = document.querySelector('.rollback input');
const rangeInputValue = document.querySelector('.rollback .range-value');

const totalInput = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePrice: 0,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },

  // функция проверки на число (true / false)
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  // функция проверки на строку
  isString: function (str) {
    return (
      typeof str === 'string' && str.trim() !== '' && !appData.isNumber(str)
    );
  },

  // задает вопросы пользователю
  asking: function () {
    let title;
    do {
      title = prompt('Как называется ваш проект?');
    } while (!appData.isString(title));

    appData.title = title;

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(name));

      // Пока введённое значение НЕ является числом, снова спрашивать пользователя стоимость
      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  // рассчет стоимости
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    // собирает стоимости доп услуг и складывает их
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  // считает общую стоимость
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  // итоговая стоимость с учётом отката
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },

  // форматирует название
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
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

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

// запуск функций
appData.start();
