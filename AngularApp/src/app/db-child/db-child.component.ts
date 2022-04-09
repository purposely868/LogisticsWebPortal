import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-child',
  templateUrl: './db-child.component.html',
  styleUrls: ['./db-child.component.css'],
})
export class DbChildComponent implements OnInit {
  @Input() serverColResponse: any[] = [];
  @Input() responseBool: Boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
