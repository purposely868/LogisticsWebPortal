import { Injectable } from '@angular/core';

function getLocalStorage(): Storage {
  return sessionStorage;
}

@Injectable({
  providedIn: 'root',
})
export class SessionStorageRefService {
  constructor() {}

  get localStorage(): Storage {
    return getLocalStorage();
  }
}
