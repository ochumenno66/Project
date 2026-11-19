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
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();
    calcBtn.addEventListener('click', appData.start);
    screenBtn.addEventListener('click', appData.addScreenBlock);
    rangeInput.addEventListener('input', function (event) {
      let inputRange = event.target.value;
      rangeInputValue.textContent = `${inputRange}%`;
      appData.rollback = +inputRange;
    });
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    //appData.addScreens();
    if (!appData.addScreens()) {
      return;
    }
    appData.addServices();
    appData.addPrices();

    //appData.logger();

    console.log(appData);
    appData.showResult();
  },

  // выводим рассчет в инпуты
  showResult: function () {
    totalInput.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screensCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    appData.screens = [];
    let isValid = true;

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      if (select.value === '' || input.value === '') {
        isValid = false;
      } else {
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value,
        });
      }
    });

    return isValid;
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  // задает вопросы пользователю
  /*asking: function () {
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
  },*/

  // рассчет стоимости
  addPrices: function () {
    appData.screensCount = 0;
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.screensCount += +screen.count;
    }

    // собирает стоимости доп услуг и складывает их
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    // считает общую стоимость
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    // итоговая стоимость с учётом отката
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

// запуск функций
appData.init();
