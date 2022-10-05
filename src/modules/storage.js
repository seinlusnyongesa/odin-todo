export default class Storage {
  static storeItem(name, item) {
    localStorage.setItem(name, JSON.stringify(item));
  }

  static getItem(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}
