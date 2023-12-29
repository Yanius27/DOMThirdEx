export default function createTds(data) {
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
