export default function sortData(arrowState, dataBase, item) {
  const headTr = dataBase.shift();
  if (arrowState.includes('td-with-arrow-down')) {
    if (item === 'title') {
      dataBase = dataBase.sort((a, b) => b[item] > a[item] ? 1: -1);
    } else {
      dataBase = dataBase.sort((a, b) => b[item] - a[item]);
    }
  } else {
    if (item === 'title') {
      dataBase = dataBase.sort((a, b) => a[item] > b[item] ? 1: -1);
    } else {
      dataBase = dataBase.sort((a, b) => a[item] - b[item]);
    }
  }
  dataBase.unshift(headTr);
  return dataBase;
}
