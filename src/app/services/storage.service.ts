import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  static setDataInLocalStorage(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  static getDataFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  static  removeFromLocalStorage() {
    localStorage.clear()
  }
}
