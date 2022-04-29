import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserQueryService } from 'src/app/services/user-query.service';
import { UserValidationService } from 'src/app/services/user-validation.service';
import UserRegistrationData from 'src/app/UserRegistrationData';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  constructor(
    private validationData: UserValidationService,
    private userquery: UserQueryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() selectedMethode: number = 0;

  errMessage: string = '';
  messageClass: string = '';

  checked: boolean[] = [false, false, false, false, false, false];

  updateValid: boolean = this.checked.every((value) => value == false);

  registeredUserData: UserRegistrationData = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    password: '',
    oszp: 0,
  };

  updateUserData: any = {};

  ngOnInit(): void {}

  onClick() {
    this.validationData
      .userValidationData()
      .then((jsonResolve) => {
        console.log(jsonResolve);
        console.log(this.route.toString());
        console.log('here');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(ngform: NgForm) {
    const formgroup = ngform.form.value;
    console.log(formgroup);

    if (ngform.form.valid) {
      switch (this.selectedMethode) {
        case 0:
          for (const key in formgroup) {
            this.registeredUserData[key] =
              formgroup[key] !== '' ? formgroup[key] : null;
          }
          this.userquery
            .register(this.registeredUserData)
            .then((resolvedJson) => {
              console.log("herre");

              this.errMessage = 'Registration Success';
              this.messageClass = 'ng-valid errMessage';
            })
            .catch((err) => {
              this.errMessage = err;
              this.messageClass = 'ng-invalid errMessage';
              console.log(err);
            });
          break;
        case 1:
          if (Object.keys(formgroup).length > 1) {
            for (const key in formgroup) {
              this.updateUserData[key] = formgroup[key];
            }
            this.userquery
              .update(this.updateUserData)
              .then((resolvedJson) => {
                this.errMessage = resolvedJson;
                this.messageClass = 'ng-valid errMessage';
                console.log(resolvedJson);
              })
              .catch((err) => {
                this.errMessage = err;
                this.messageClass = 'ng-invalid errMessage';
                console.log(err);
              });
          } else {
            this.errMessage = 'Please proved a user property to update.';
            this.messageClass = 'ng-invalid errMessage';
          }
          break;
        case 2:
          this.userquery
            .delete(formgroup.userName)
            .then((resolvedJson) => {
              this.errMessage = resolvedJson;
              this.messageClass = 'ng-valid errMessage';
              console.log(resolvedJson);
            })
            .catch((err) => {
              this.errMessage = err;
              this.messageClass = 'ng-invalid errMessage';
              console.log(err);
            });
          break;

        default:
          break;
      }
    } else {
      this.errMessage = 'This form Is not valid';
      this.messageClass = 'ng-invalid errMessage';
    }
  }
}
