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

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые');

  screenPrice = prompt('Сколько будет стоить данная работа?');

  while (!isNumber(screenPrice)) {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  }

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  //return servicePrice1 + servicePrice2;
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    sum += +prompt('Сколько это будет стоить?');
  }
  return sum;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getTitle = function () {
  //title = title.trim();
  //return title[0].toUpperCase() + title.slice(1).toLowerCase();
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
};

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

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getAllServicePrices();
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(`Тип экрана ${screens}`);
console.log('Итоговая стоимость ' + servicePercentPrice + 'руб');
