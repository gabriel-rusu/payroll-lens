import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  append(key: string, value: any) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      // @ts-ignore
      let previousItems = JSON.parse(localStorage.getItem(key));
      if (previousItems && previousItems instanceof Array) {
        previousItems = previousItems.push(value);
      } else {
        previousItems = [previousItems, value];
      }
      localStorage.setItem(key, JSON.stringify(previousItems));
    }
  }

  get(key: string) {
    if (localStorage.getItem(key) !== null) {
      // @ts-ignore
      return JSON.parse(localStorage.getItem(key));
    } else {
      return null;
    }
  }
}
