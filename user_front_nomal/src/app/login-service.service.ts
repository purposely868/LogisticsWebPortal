import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() {}

  async loginRequest(userPass: any) {
    return await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(userPass),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }).then((resolve) => resolve.json());
  }
}
