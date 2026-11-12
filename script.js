'use strict';

let title = 'Project';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 5000;
let rollback = 10;
let fullPrice = 15000;
let adaptive = true;

// Вывести в консоль тип данных значений переменных
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вывести в консоль длину строки из переменной
console.log(screens.length);

// Вывести в консоль “Стоимость верстки экранов” и “Стоимость разработки сайта”
console.log(`Стоимость верстки экранов ${screenPrice}руб`);
console.log(`Стоимость разработки сайта ${fullPrice}руб`);

// Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив
console.log(screens.toLowerCase().split(', '));

// Вывести в консоль Процент отката посреднику за работу
console.log(fullPrice * (rollback / 100));

// Lesson03
title = prompt('Как называется ваш проект?');

screens = prompt(
  'Какие типы экранов нужно разработать?(пример: "Простые, Сложные, Интерактивные")',
);

screenPrice = +prompt('Сколько будет стоить данная работа?');

adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');

let servicePrice1 = +prompt('Сколько это будет стоить?');

let service2 = prompt('Какой дополнительный тип услуги нужен?');

let servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log('Итоговая стоимость ' + servicePercentPrice + 'руб');

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log('Скидка не предусмотрена');
} else if (fullPrice < 0) {
  console.log('Что то пошло не так');
}
