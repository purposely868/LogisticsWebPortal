import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-spec-menu',
  templateUrl: './app-spec-menu.component.html',
  styleUrls: ['./app-spec-menu.component.scss'],
})
export class AppSpecMenuComponent implements OnInit {

@Output() selectedView = new EventEmitter<number>();

  selectedCSS: string[] = ["bg-info","",""];

  constructor() {}

  ngOnInit(): void {}

  selection(selected: number) {

    this.selectedView.emit(selected);
    
    switch (selected) {
      case 0:
        this.selectedCSS = ["bg-info", "", ""];
        break;
      case 1:
        this.selectedCSS = ["", "bg-info", ""];
        break;
      case 2:
        this.selectedCSS = ["", "", "bg-info"];
        break;
      default:
        break;
    }
  }
}
