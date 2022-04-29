import { Injectable } from '@angular/core';
import UserData from '../UserRegistrationData';

@Injectable({
  providedIn: 'root',
})
export class UserQueryService {
  constructor() {}

  async register(userData: UserData) {
    const resolve = await fetch('http://localhost:3000/userReg/register', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          return Promise.reject(jsonResolved.info);
        } else {
          return jsonResolved.info;
        }
      });
    return resolve;
  }

  async update(userData: any) {
    const resolve = await fetch('http://localhost:3000/userReg/update', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          return Promise.reject(jsonResolved.info);
        } else {
          return jsonResolved.info;
        }
      });
    return resolve;
  }

  async delete(username: string) {
    const resolve = await fetch('http://localhost:3000/userReg/delete', {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify({ userName: username }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          return Promise.reject(jsonResolved.info);
        } else {
          return jsonResolved.info;
        }
      });
    return resolve;
  }
}
