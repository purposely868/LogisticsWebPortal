import { Component, Input, OnInit } from '@angular/core';
import userInfo from '../../userInfoInterface';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  @Input() userInfoIn!: userInfo;

  constructor() {}

  get iteration() {
    const iterationArray: any[][] = [[]];
    let carryArray: any[] = [];

    for (const key in this.userInfoIn) {
      const element = this.userInfoIn[key];

      if (key == 'userAppRights' || key == 'allApps') {
        for (const iterator of element) {
          for (const key in iterator) {
            carryArray.push(iterator[key]);
          }
        }
      } else {
        for (const key in element) {
          const e = element[key];
          carryArray.push(e);
        }
      }
      iterationArray.push(carryArray);
      carryArray = [];
    }

    return iterationArray;
  }

  ngOnInit(): void {}
}
