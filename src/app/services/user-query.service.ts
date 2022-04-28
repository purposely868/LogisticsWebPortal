import { Injectable } from '@angular/core';
import UserData from '../UserData';

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
    });
    return await resolve.json();
  }

  update() {}

  delete() {}
}
