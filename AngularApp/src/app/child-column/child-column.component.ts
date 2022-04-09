import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalFormModel } from '../global_form_model';
import { GlobalInterface } from '../response';

@Component({
  selector: 'app-child-column',
  templateUrl: './child-column.component.html',
  styleUrls: ['./child-column.component.css'],
})
export class ChildColumnComponent implements OnInit {
  @Input() globalModel: GlobalFormModel = {
    ngFormValidations: [],
    dbsName: '',
    dbsMethod: '',
    tblCheck: false,
    tblName: '',
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

  @Output() colSubmit = new EventEmitter<GlobalFormModel>();

  constructor() {}

  ngOnInit(): void {}

  forwardData(dataChecked: boolean, tblformValid: boolean, ngForm: NgForm) {
    if (dataChecked == true) {
      this.globalModel.dataProps.dataChecked = true;
      this.globalModel.ngFormValidations.push(tblformValid);
      this.globalModel.columnProps.columnNames.push(ngForm.value.columnInput);
      this.globalModel.columnProps.columnType.push(ngForm.value.columnType);

      this.globalModelChange.emit(this.globalModel);

      console.log(this.globalModel);
    } else {
      this.globalModel.dataProps.dataChecked = true;
      this.globalModel.ngFormValidations.pop();
      this.globalModelChange.emit(this.globalModel);
    }
  }

  onSubmit(ngForm: NgForm) {
    this.globalModel.ngFormValidations.push(ngForm.valid);
    this.globalModel.columnProps.columnNames.push(ngForm.value.columnInput);
    this.globalModel.columnProps.columnType.push(ngForm.value.columnType);
    this.colSubmit.emit(this.globalModel);
  }
}
