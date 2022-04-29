import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserValidationService {
  constructor() {}

  async userValidationData() {
    // Ez a methodus biztosítja a szükséges adatokat a regisztráció során felvett adatok valivalidálásához

    const validationData = fetch(
      'http://localhost:3000/userReg/frontvalidation',
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }
    ).then((resolve) => {
      return resolve.json();
    });

    return validationData;
  }
}
