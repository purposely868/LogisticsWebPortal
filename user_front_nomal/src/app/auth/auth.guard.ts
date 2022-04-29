import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private _userSt: boolean = false;

  constructor(private router: Router, private userdata: UserDataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('parent');
    return this.getingRequest();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    //console.log(this.login.token);
    console.log('child');
    return this._userSt;
  }

  // This is for checking what session data we have then log us in or reject it
  async getingRequest() {
    if (await this.userdata.UserAuthentication()) {
      this._userSt = true;
      return true;
    } else {
      this._userSt = false;
      return this.router.parseUrl('/login');
    }
  }
}
