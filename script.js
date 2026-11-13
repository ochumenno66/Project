'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;
let servicePrice;

// функция проверки на число (true / false)
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

// задает вопросы пользователю
const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые');

  // Пока введённое значение НЕ является числом, снова спрашивать пользователя стоимость
  do {
    screenPrice = prompt('Сколько будет стоить данная работа?', '123');
  } while (!isNumber(screenPrice));
  screenPrice = parseFloat(screenPrice);

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

// показывает значение переменной и её тип
const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

// собирает стоимости доп услуг и складывает их
const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'CMS');
    }

    do {
      servicePrice = prompt('Сколько это будет стоить?', '12');
    } while (!isNumber(servicePrice));

    sum += Number(servicePrice);
  }
  return sum;
};

// считает общую стоимость
function getFullPrice() {
  return screenPrice + allServicePrices;
}

// форматирует название
const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
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
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

// запуск функций
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
showTypeOf(fullPrice);

console.log('Стоимость доп услуг ' + allServicePrices + 'руб');
console.log(`Тип экрана ${screens}`);
console.log(getRollbackMessage(fullPrice));
console.log('Итоговая стоимость ' + servicePercentPrice + 'руб');
