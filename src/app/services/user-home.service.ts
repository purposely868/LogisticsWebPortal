import { Injectable } from '@angular/core';
import { ContentData } from '../contentDataInt';
import { SessionStorageContentService } from './session-storage-content.service';

@Injectable({
  providedIn: 'root',
})
export class UserHomeService {
  constructor(private _contentSession: SessionStorageContentService) {}

  async userHomeGeneralInfo() {
    return fetch('http://localhost:3000/userHome', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((resolve) => {
        return resolve.json();
      })
      .then((resolvedJson) => {
        //console.log(resolvedJson);
        this._contentSession.setInfo(resolvedJson.info as ContentData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadUserHomeContent() {
    return this._contentSession.loadInfo('ContentData');
  }
}
