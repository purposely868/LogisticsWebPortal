import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CegModel } from './models/ceg.model';

@Injectable({
  providedIn: 'root',
})
export class CegService {
  constructor(private http: HttpClient) {}

  getCegek(): Observable<CegModel[]> {
    return this.http.get<CegModel[]>('http://127.0.0.1:8000/cegek');
  }
}

