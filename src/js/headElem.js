export default function headElem(dataBase) {
  const keys = Object.keys(dataBase[0])
  const headElem = {};
  keys.forEach((el) => {
    headElem[el] = el;   
  })
  return headElem;
}
