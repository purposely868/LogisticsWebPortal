import { Component, OnInit } from '@angular/core';
import { SessionStorageContentService } from 'src/app/services/session-storage-content.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(private userdata: UserDataService) {}

  dataout = this.userdata.myUserData$;

  ngOnInit(): void {}

  get getUserData() {
    // Itt pusztán a felhasználó személyesi információit szedem ki de nem az o_sz_p infót
    const userInfoData: string[][] = [];

    this.dataout.subscribe((x) => {
      if (x) {
        for (const key in x.userInfo) {
          const element = x.userInfo[key];
          userInfoData.push([key, element]);
        }
      }
    });
    return userInfoData;
  }
}
