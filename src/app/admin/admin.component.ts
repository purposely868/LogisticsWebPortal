import { Component, OnInit } from '@angular/core';
import { RegModel } from '../models/reg.model';
import { RegistService } from '../regist.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public regist : RegModel[] = [];

  constructor(private Registszerviz:RegistService) {
    
    this.Registszerviz.getRegist().subscribe(adatok => {
      this.regist = adatok;
    })
   }

  ngOnInit(): void {
  }

}
