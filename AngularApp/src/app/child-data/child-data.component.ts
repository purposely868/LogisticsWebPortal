import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalFormModel } from '../global_form_model';
import { GlobalInterface } from '../response';

@Component({
  selector: 'app-child-data',
  templateUrl: './child-data.component.html',
  styleUrls: ['./child-data.component.css'],
})
export class ChildDataComponent implements OnInit {
  @Input() globalModel: GlobalFormModel = {
    ngFormValidations: [],
    dbsName: '',
    dbsMethod: '',
    tblName: '',
    tblCheck: false,
    tableMethod: '',
    columnProps: {
      columnChecked: false,
      columnNames: [],
      columnMethod: '',
      columnType: [],
    },
    dataProps: {
      dataChecked: false,
      dataMethod: '',
      dataInsertion: '',
    },
  };
  @Output() globalModelChange = new EventEmitter<GlobalFormModel>();

  @Output() datSubmit = new EventEmitter<GlobalFormModel>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(datForm: NgForm) {
    this.globalModel.ngFormValidations.push(datForm.form.valid);
    this.datSubmit.emit(this.globalModel);
  }
}
