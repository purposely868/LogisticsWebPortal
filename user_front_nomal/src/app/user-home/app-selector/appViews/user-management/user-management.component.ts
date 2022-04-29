import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  constructor() {}

  selected = 0;

  ngOnInit(): void {}

  selectedMode(selectedView: number) {
    this.selected = selectedView;
  }
}
