import { Component, OnInit } from '@angular/core';
import { CegService } from '../ceg.service';
import { CommonModule } from '@angular/common';
import { CegModel } from '../models/ceg.model';

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.css']
})
export class CooperationComponent implements OnInit {
  public cegek: CegModel[] = [];


  constructor(private cegszerviz: CegService) {
    this.cegszerviz.getCegek().subscribe((adatok) => {
      this.cegek = adatok;
    });
  }

  ngOnInit(): void {
  }

}
