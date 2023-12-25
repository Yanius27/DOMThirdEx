import '../src/css/styles.css';
import DataBaseStorage from './js/DataBaseStorage.js';
import headElem from './js/headElem.js';
import sortData from './js/sortData.js';
import createTrs from './js/createTrs.js';

// init and load storage
const storage = new DataBaseStorage();
storage.setStorage();
let dataBase = storage.getStorage();
dataBase.unshift(headElem(dataBase));

// create table
const table = document.createElement('table');
table.classList.add('cinemaTable');
const trs = createTrs(dataBase);
trs.forEach((el) => { 
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
  trNodes.forEach((el) => table.appendChild(el));
}

table.querySelector('.td-with-arrow-up').addEventListener('click', (event) => arrowListener(event.target));

// add table in document
document.documentElement.children[1].appendChild(table);

const items = Object.keys(dataBase[0]);
let count = 0;

// setInterval function
function interval() {
  arrowState = table.children[0].children[0].className.split(" ");
  return setInterval(() => {
    if (!items[count]) {
      count = 0;
    }
    const sortedData = sortData(arrowState, dataBase, items[count]);
    const trs = createTrs(sortedData);
    table.innerHTML = '';
    trs.forEach((el) => { 
      el.classList.add('line');
      table.appendChild(el);
    });
    arrowState.forEach((el) => table.children[0].children[0].classList.add(el));
    table.querySelector('.td-with-arrow-up').addEventListener('click', (event) => arrowListener(event.target));
    count++;
  }, 8000);
}
let intervalId = interval();
