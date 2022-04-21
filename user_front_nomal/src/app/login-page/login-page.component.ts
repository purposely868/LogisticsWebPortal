import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @Output() loginResult = new EventEmitter<boolean>();

  @Output() loginName = new EventEmitter<string>();

  constructor(private login: LoginService) {}

  ngOnInit(): void {}

  onSubmit(ngForm: NgForm) {
    console.log(ngForm.value);

    this.login
      .loginRequest(ngForm.value)
      .then((resolve) => {
        this.loginResult.emit(true);

        console.log(resolve);
        console.log('login succesful');

        this.loginName.emit(ngForm.value.username);
      })
      .catch((err) => {
        this.loginResult.emit(false);
        console.log(err);
      });
  }
}
