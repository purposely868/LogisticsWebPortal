import { Component, OnInit } from '@angular/core';
import { SessionStorageContentService } from 'src/app/services/session-storage-content.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
  constructor(private appInfoSessionStorage: SessionStorageContentService) {}

  appNameDiscription: string[][] = [];

  ngOnInit(): void {
    this.appInfoSessionStorage.myAppInfo$.subscribe((x) => {
      if (x) {
        console.log(x);
        for (let i = 0; i < x.appName.length; i++) {
          this.appNameDiscription.push([x.appName[i], x.appDescription[i]]);
        }
      }
    });
  }
}
