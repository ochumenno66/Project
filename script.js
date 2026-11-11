'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt(
  'Какие типы экранов нужно разработать?(пример: "Простые, Сложные, Интерактивные")',
);
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 10;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (a, b) {
  return a + b;
};
let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(a, b) {
  return a + b;
}
let fullPrice = getFullPrice(screenPrice, allServicePrices);

const getTitle = function () {
  title = title.trim();
  return title[0].toUpperCase() + title.slice(1).toLowerCase();
};
getTitle();

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

const getServicePercentPrices = function (price, percent) {
  return Math.ceil(price - price * (percent / 100));
};

let servicePercentPrice = getAllServicePrices(fullPrice, rollback);

showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(`Тип экрана ${screens}`);
console.log(getRollbackMessage(fullPrice));
console.log('Итоговая стоимость ' + servicePercentPrice + 'руб');
