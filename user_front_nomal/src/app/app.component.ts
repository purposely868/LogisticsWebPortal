import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionStorageContentService } from './services/session-storage-content.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private contenSession: SessionStorageContentService,

    private router: Router,
    private modalService: NgbModal
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {}
}
