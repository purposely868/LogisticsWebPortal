import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  async passwordValidations() {
    
  }

  async loginRequest(userPass: any): Promise<Response> {
    return await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(userPass),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }).then((resolve) => resolve.json());
  }
}
