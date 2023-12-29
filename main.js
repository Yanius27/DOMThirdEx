/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/dataBase.js
const dataBase = [{
  "id": 26,
  "title": "Побег из Шоушенка",
  "imdb": 9.30,
  "year": 1994
}, {
  "id": 25,
  "title": "Крёстный отец",
  "imdb": 9.20,
  "year": 1972
}, {
  "id": 27,
  "title": "Крёстный отец 2",
  "imdb": 9.00,
  "year": 1974
}, {
  "id": 1047,
  "title": "Тёмный рыцарь",
  "imdb": 9.00,
  "year": 2008
}, {
  "id": 223,
  "title": "Криминальное чтиво",
  "imdb": 8.90,
  "year": 1994
}];
;// CONCATENATED MODULE: ./src/js/DataBaseStorage.js

class DataBaseStorage {
  constructor() {
    this.dataBase = dataBase;
    this.storage = window.localStorage;
  }
  setStorage() {
    this.storage.setItem('dataBase', JSON.stringify(this.dataBase));
  }
  getStorage() {
    return JSON.parse(this.storage.getItem('dataBase'));
  }
}
;// CONCATENATED MODULE: ./src/js/headElem.js
function headElem(dataBase) {
  const keys = Object.keys(dataBase[0]);
  const headElem = {};
  keys.forEach(el => {
    headElem[el] = el;
  });
  return headElem;
}
;// CONCATENATED MODULE: ./src/js/sortData.js
function sortData(arrowState, dataBase, item) {
  const headTr = dataBase.shift();
  if (arrowState.includes('td-with-arrow-down')) {
    if (item === 'title') {
      dataBase = dataBase.sort((a, b) => b[item] > a[item] ? 1 : -1);
    } else {
      dataBase = dataBase.sort((a, b) => b[item] - a[item]);
    }
  } else {
    if (item === 'title') {
      dataBase = dataBase.sort((a, b) => a[item] > b[item] ? 1 : -1);
    } else {
      dataBase = dataBase.sort((a, b) => a[item] - b[item]);
    }
  }
  dataBase.unshift(headTr);
  return dataBase;
}
;// CONCATENATED MODULE: ./src/js/createTds.js
function createTds(data) {
  const arr = [];
  for (let key in data) {
    let td;
    if (key === 'imdb') {
      td = document.createElement('td');
      td.textContent = `imdb: ${data[key]}`;
    } else if (key === 'year') {
      td = document.createElement('td');
      td.textContent = `(${data[key]})`;
    } else {
      td = document.createElement('td');
      td.textContent = data[key];
    }
    arr.push(td);
  }
  return arr;
}
;// CONCATENATED MODULE: ./src/js/createTrs.js

function createTrs(dataBase) {
  const arrOfTrs = [];
  for (let i = 0; i < dataBase.length; i++) {
    const tr = document.createElement('tr');
    createTds(dataBase[i]).forEach(el => tr.appendChild(el));
    arrOfTrs.push(tr);
  }
  return arrOfTrs;
}
;// CONCATENATED MODULE: ./src/index.js






// init and load storage
const storage = new DataBaseStorage();
storage.setStorage();
let src_dataBase = storage.getStorage();
src_dataBase.unshift(headElem(src_dataBase));

// create table
const table = document.createElement('table');
table.classList.add('cinemaTable');
const trs = createTrs(src_dataBase);
trs.forEach(el => {
  el.classList.add('line');
  table.appendChild(el);
});
table.children[0].children[0].classList.add('td-with-arrow-up');
let arrowState = [];

// listener for arrow
function arrowListener(target) {
  target.classList.toggle('td-with-arrow-down');
  const trNodes = Array.from(table.childNodes);
  const headTr = trNodes.shift();
  trNodes.reverse().unshift(headTr);
  table.innerHTML = '';
  trNodes.forEach(el => table.appendChild(el));
}
table.querySelector('.td-with-arrow-up').addEventListener('click', event => arrowListener(event.target));

// add table in document
document.documentElement.children[1].appendChild(table);
const items = Object.keys(src_dataBase[0]);
let count = 0;

// setInterval function
function interval() {
  arrowState = table.children[0].children[0].className.split(" ");
  return setInterval(() => {
    if (!items[count]) {
      count = 0;
    }
    const sortedData = sortData(arrowState, src_dataBase, items[count]);
    const trs = createTrs(sortedData);
    table.innerHTML = '';
    trs.forEach(el => {
      el.classList.add('line');
      table.appendChild(el);
    });
    arrowState.forEach(el => table.children[0].children[0].classList.add(el));
    table.querySelector('.td-with-arrow-up').addEventListener('click', event => arrowListener(event.target));
    count++;
  }, 8000);
}
let intervalId = interval();
/******/ })()
;