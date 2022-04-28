import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageContentService } from 'src/app/services/session-storage-content.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  constructor(
    private router: Router,
    private _contentSession: SessionStorageContentService,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {}

  quitClick() {
    this.router.navigateByUrl('/login');
    console.log(this.cookies.getAll());

    fetch('http://localhost:3000/logout', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((resolve) => {
        return resolve.json();
      })
      .then((resolvedJson) => {
        console.log(resolvedJson);
        this._contentSession.clearAllSessionStorage();
        this.cookies.deleteAll();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
