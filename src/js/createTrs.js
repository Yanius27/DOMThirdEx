import createTds from './createTds';

export default function createTrs(dataBase) {
  const arrOfTrs = [];
  for (let i = 0; i < dataBase.length; i++) {
    const tr = document.createElement('tr');
    createTds(dataBase[i]).forEach((el) => tr.appendChild(el));
    arrOfTrs.push(tr);
  }
  return arrOfTrs;
}