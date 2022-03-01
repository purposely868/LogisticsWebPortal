import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegModel } from './models/reg.model';

@Injectable({
  providedIn: 'root',
})
export class RegistService {
  constructor(private http: HttpClient) {}
  getRegist(): Observable<RegModel[]> {
    return this.http.get<RegModel[]>('http://127.0.0.1:8000/regist');
  }
}
