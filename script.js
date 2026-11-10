const title = 'Project';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 5000;
const rollback = 10;
const fullPrice = 15000;
const adaptive = true;

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
