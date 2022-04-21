import { Component } from '@angular/core';
import userInfo from '../userInfoInterface';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'user_front_nomal';

  userInfo!: userInfo;

  display: boolean[] = [true, false];

  constructor(private login: LoginService) {}

  loginHandle(result: boolean) {
    if (result) {
      this.display = [false, true];
    }
  }

  userHome(username: string) {
    this.login
      .userHomeRequest(username)
      .then((jsonRes) => {
        console.log(jsonRes);
        this.userInfo = jsonRes;
      })
      .catch((err) => {
        console.log(err.info);
      });
  }
}
