import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageRefService } from './session-storage-ref.service';

import { ContentData, AppInfo } from '../contentDataInt';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageContentService {
  private _sessionStorage: Storage;

  constructor(private _sessionStorageRefService: SessionStorageRefService) {
    this._sessionStorage = _sessionStorageRefService.localStorage;
  }

  // data for contents to be saved in session storage
  private _myContetData$ = new BehaviorSubject<ContentData | null>(null);

  private _myAppInfo$ = new BehaviorSubject<AppInfo | null>(null);

  public myContetData$ = this._myContetData$.asObservable();

  public myAppInfo$ = this._myAppInfo$.asObservable();

  setInfo(data: ContentData | AppInfo) {
    const jsonData = JSON.stringify(data);

    if (this.isAppInfo(data)) {

      this._sessionStorage.setItem('AppInfo', jsonData);
      this._myAppInfo$.next(data);
    } else {

      this._sessionStorage.setItem('ContentData', jsonData);
      this._myContetData$.next(data);
    }
  }

  loadInfo(data: 'AppInfo' | 'ContentData') {
    if (data === 'AppInfo') {
      const value: AppInfo | null = this._sessionStorage.getItem('AppInfo')
        ? (JSON.parse(this._sessionStorage.getItem('AppInfo')!) as AppInfo)
        : null;

      this._myAppInfo$.next(value);
    } else {
      const value: ContentData | null = this._sessionStorage.getItem(
        'ContentData'
      )
        ? (JSON.parse(
            this._sessionStorage.getItem('ContentData')!
          ) as ContentData)
        : null;
      this._myContetData$.next(value);
    }
  }

  clearInfo(data: 'AppInfo' | 'ContentData') {
    if (data === 'AppInfo') {
      this._sessionStorage.removeItem('AppInfo');
      this._myAppInfo$.next(null);
    } else {
      this._sessionStorage.removeItem('ContentData');
      this._myContetData$.next(null);
    }
  }

  clearAllSessionStorage() {
    // Kitöröl mindent a session storage-ból
    this._sessionStorage.clear();
    this._myContetData$.next(null);
    this._myAppInfo$.next(null);
  }

  //type checker app infónak és content data-nak
  isAppInfo(params: AppInfo | ContentData): params is AppInfo {
    return (params as AppInfo).appName !== undefined;
  }
}
