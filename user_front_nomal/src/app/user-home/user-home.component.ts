import { Component, Input, OnInit } from '@angular/core';
import userInfo from '../../userInfoInterface';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  @Input() userInfoIn!: userInfo;

  constructor(
    
  ) {}

  

  

  ngOnInit(): void {}
}
