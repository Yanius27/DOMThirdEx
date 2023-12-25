import { dataBase } from './dataBase';

export default class DataBaseStorage {
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