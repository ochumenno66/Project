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

let mainControls = document.querySelectorAll(
  '.main-controls input[type="text"], .main-controls select',
);

const appData = {
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    this.addTitle();
    calcBtn.addEventListener('click', appData.start.bind(this));
    screenBtn.addEventListener('click', appData.addScreenBlock.bind(this));
    rangeInput.addEventListener('input', (event) => {
      let inputRange = event.target.value;
      rangeInputValue.textContent = `${inputRange}%`;
      this.rollback = +inputRange;
    });
    resetBtn.addEventListener('click', appData.reset.bind(this));
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    if (!this.addScreens()) {
      return;
    }
    this.addServices();
    this.addPrices();

    //appData.logger();

    console.log(appData);
    this.showResult();
    this.disableInputs();
  },

  reset: function () {
    mainControls.forEach((item) => {
      if (item.tagName === 'INPUT') {
        item.value = '';
      } else if (item.tagName === 'SELECT') {
        item.selectedIndex = 0;
      }
    });

    screens.forEach((elem, index) => {
      if (index !== 0) {
        elem.remove();
      }
    });

    screens = document.querySelectorAll('.screen');
    this.screens = [];
    this.screensCount = 0;
    this.screenPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;

    mainControls.forEach((item) => {
      item.disabled = false;
    });
    calcBtn.style.display = 'block';
    resetBtn.style.display = 'none';

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const input = item.querySelector('input[type=text]');

      check.checked = false;
      input.value = '';
      check.disabled = false;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const input = item.querySelector('input[type=text]');

      check.checked = false;
      input.value = '';
      check.disabled = false;
    });

    screenBtn.disabled = false;

    this.rollback = 0;
    rangeInput.value = 0;
    rangeInputValue.textContent = `${0}%`;

    rangeInput.disabled = false;

    totalInput.value = '';
    totalCount.value = '';
    totalCountOther.value = '';
    totalFullCount.value = '';
    totalCountRollback.value = '';
  },

  // выводим рассчет в инпуты
  showResult: function () {
    totalInput.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.screensCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    this.screens = [];
    let isValid = true;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      if (select.value === '' || input.value === '') {
        isValid = false;
      } else {
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value,
        });
      }
    });

    return isValid;
  },

  // сбор доп услуг
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  // добавление нового блока в расчет экранов
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  // рассчет стоимости
  addPrices: function () {
    this.screensCount = 0;
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
      this.screensCount += +screen.count;
    }

    // собирает стоимости доп услуг и складывает их
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    // считает общую стоимость
    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    // итоговая стоимость с учётом отката
    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  // блокировка полей ввода после рассчета
  disableInputs: function () {
    mainControls = document.querySelectorAll(
      '.main-controls input[type="text"], .main-controls select',
    );

    screenBtn.disabled = true;

    mainControls.forEach((item) => {
      item.disabled = true;
    });
    calcBtn.style.display = 'none';
    resetBtn.style.display = 'block';

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      check.disabled = true;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      check.disabled = true;
      rangeInput.disabled = true;
    });
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  },
};

// запуск функций
appData.init();
