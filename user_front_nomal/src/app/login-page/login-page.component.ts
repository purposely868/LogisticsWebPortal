import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @Output() loginResult = new EventEmitter<boolean>();

  constructor(private login: LoginServiceService) {}

  ngOnInit(): void {}

  onSubmit(ngForm: NgForm) {
    console.log(ngForm.value);

    this.login.loginRequest(ngForm.value).then((result) => {
      if ('message' in result) {
        console.log(result);
      } else {
        this.loginResult.emit(true);
      }
    });
  }
}
