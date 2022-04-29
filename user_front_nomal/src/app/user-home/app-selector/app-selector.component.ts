import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-selector',
  templateUrl: './app-selector.component.html',
  styleUrls: ['./app-selector.component.scss'],
})
export class AppSelectorComponent implements OnInit, AfterContentChecked {
  constructor(private router: Router) {}

  activeChildRoute = '';

  ngAfterContentChecked(): void {
    this.activeChildRoute = this.router.url;
    //console.log(this.activeChildRoute);
  }

  ngOnInit(): void {}

  clicking() {
    this.activeChildRoute = this.router.url;
    console.log(this.activeChildRoute);
  }
}
