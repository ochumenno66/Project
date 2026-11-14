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
    } while (!isNumber(appData.screenPrice));
    appData.screenPrice = parseFloat(appData.screenPrice);

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  start: function () {
    this.asking();
    appData.allServicePrices = getAllServicePrices();
    appData.fullPrice = getFullPrice();
    appData.discount = getRollbackMessage(appData.fullPrice);
    appData.servicePercentPrice = getServicePercentPrices();
    appData.title = getTitle();
    this.logger();
  },

  logger: function () {
    for (let key in appData) {
      console.log('Ключ: ' + key + ', Значение:' + appData[key]);
    }
  },
};

// функция проверки на число (true / false)
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

// собирает стоимости доп услуг и складывает их
const getAllServicePrices = function () {
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
    } while (!isNumber(appData.servicePrice));

    sum += Number(appData.servicePrice);
  }
  return sum;
};

// считает общую стоимость
function getFullPrice() {
  return appData.screenPrice + appData.allServicePrices;
}

// форматирует название
const getTitle = function () {
  return (
    appData.title.trim()[0].toUpperCase() +
    appData.title.trim().substr(1).toLowerCase()
  );
};

// определяет размер скидки
const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что то пошло не так';
  }
};

// итоговая стоимость с учётом отката
const getServicePercentPrices = function () {
  return Math.ceil(
    appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
  );
};

// запуск функций
appData.start();
