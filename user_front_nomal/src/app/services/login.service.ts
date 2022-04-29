import { Injectable } from '@angular/core';
import userInfo from 'src/userInfoInterface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  async passwordValidations() {}

  async loginRequest(userPass: any) {
    return await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(userPass),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          return Promise.reject(jsonResolved.info);
        } else {
          return jsonResolved.info;
        }
      });
  }

  async userHomeRequest(username: string) {
    return await fetch('http://localhost:3000/userHome', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          return Promise.reject(jsonResolved.info);
        } else {
          console.log(jsonResolved.info);
          console.log("user home");
          return jsonResolved.info as userInfo;
        }
      });
  }
}
