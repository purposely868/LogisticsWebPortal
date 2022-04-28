import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgModel } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  errMessage: string = '';
  messageClass: string = '';

  constructor(private userdata: UserDataService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(user: NgModel, pass: NgModel) {
    // testing cookies
    if (!(user.valid && pass.valid)) {
      this.messageClass = 'ng-invalid errMessage';
      this.errMessage = 'Kindly provide the username and the password';
    } else if (!pass.valid) {
      this.messageClass = 'ng-invalid errMessage';
      this.errMessage = 'Kindly provide the password';
    } else if (!user.valid) {
      this.messageClass = 'ng-invalid errMessage';
      this.errMessage = 'Kindly provide the username';
    } else {
      this.userdata.UserNamePassSet({
        username: this.username,
        password: this.password,
        login: true,
      });

      this.userdata.myUserError$.subscribe((x) => {
        if (x) {
          console.log("loginerror")
          this.messageClass = 'ng-invalid errMessage';
          this.errMessage = x;
        }
      });
      this.router.navigateByUrl('/userHome/main');

      console.log('here?');
    }
  }
}
