import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppInfo } from '../contentDataInt';
import UserData from '../userDataInt';
import { SessionStorageContentService } from './session-storage-content.service';
import { UserHomeService } from './user-home.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(
    private userHomeInfo: UserHomeService,
    private appInfoSessionStorage: SessionStorageContentService
  ) {}

  private _myUserData$ = new BehaviorSubject<UserData | null>({
    userInfo: {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: null,
      oszp: 0,
    },
    posInfo: {
      departmentName: '',
      pozLevel: 0,
      pozitionName: '',
      pozitionDiscription: '',
      appName: '',
      rights: [],
    },
  });
  public myUserData$ = this._myUserData$.asObservable();

  private _myUserError$ = new BehaviorSubject<string>('');

  public myUserError$ = this._myUserError$.asObservable();

  private _myNamePass = new BehaviorSubject<{
    username: string;
    password: string;
    login: boolean;
  }>({ username: '', password: '', login: false });

  public myNamePass = this._myNamePass.asObservable();

  UserNamePassSet(data: {
    username: string;
    password: string;
    login: boolean;
  }) {
    this._myNamePass.next(data);
  }

  UserDataSet(data: UserData) {
    this._myUserData$.next(data);
  }

  UserDataClear() {
    this._myUserData$.next(null);
  }

  // Login Async Function ==================
  async loginRequest(username: string, password: string) {
    return await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          this._myUserError$.next(jsonResolved.info);
          return false;
        } else {
          //console.log(jsonResolved.error);

          // user info to session storage

          const userda = {
            userInfo: jsonResolved.info[0],
            posInfo: jsonResolved.info[1],
          } as UserData;

          // here we set the new incomming user data and app info additionally call a function to get the home data from the server.
          this.appInfoSessionStorage.setInfo(jsonResolved.appinfo as AppInfo);

          this._myUserData$.next(userda);

          this.userHomeInfo.userHomeGeneralInfo();

          return true;
        }
      });
  }

  async UserDataRequest() {
    // This is used when we refress the page.
    return await fetch('http://localhost:3000/userData', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((resolve) => resolve.json())
      .then((jsonResolved) => {
        if (jsonResolved.error) {
          this._myUserError$.next(jsonResolved.info);
          return false;
        } else {
          //console.log(jsonResolved.error);

          // user info to session storage

          const userdata = {
            userInfo: jsonResolved.info[0],
            posInfo: jsonResolved.info[1],
          } as UserData;

          // Here we load all the neceserry data from the server and the session again

          this._myUserData$.next(userdata);

          this.userHomeInfo.loadUserHomeContent();

          this.appInfoSessionStorage.loadInfo('AppInfo');

          // return true for authentication
          return true;
        }
      });
  }

  async UserAuthentication() {
    if (this._myNamePass.value.login) {
      return this.loginRequest(
        this._myNamePass.value.username,
        this._myNamePass.value.password
      );
    } else {
      return this.UserDataRequest().catch((err) => {
        return false;
      });
    }
  }
}
