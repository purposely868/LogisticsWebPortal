import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserQueryService } from 'src/app/services/user-query.service';
import { UserValidationService } from 'src/app/services/user-validation.service';
import UserData from '../../../../UserData';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  constructor(
    private validationData: UserValidationService,
    private userquery: UserQueryService
  ) {}

  errMessage: string = '';
  messageClass: string = '';
  registeredUserData: UserData = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    password: '',
    oszp: 0,
  };

  ngOnInit(): void {}

  onClick() {
    this.validationData
      .userValidationData()
      .then((jsonResolve) => {
        console.log(jsonResolve);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(ngform: NgForm) {
    const formgroup = ngform.form.value;

    if (ngform.form.valid) {
      for (const key in ngform.form.value) {
        this.registeredUserData[key] =
          formgroup[key] !== '' ? formgroup[key] : null;
      }
      this.userquery
        .register(this.registeredUserData)
        .then((resolvedJson) => {
          console.log(resolvedJson);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('No');
    }
    console.log(this.registeredUserData);
  }
}
