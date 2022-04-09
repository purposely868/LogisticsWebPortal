import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { GlobalFormModel } from '../global_form_model';
import { GlobalInterface } from '../response';

@Component({
  selector: 'app-child-tbl',
  templateUrl: './child-tbl.component.html',
  styleUrls: ['./child-tbl.component.css'],
})
export class ChildTblComponent implements OnInit {
  @Input() globalModel: GlobalFormModel = {
    ngFormValidations: [],
    dbsName: '',
    dbsMethod: '',
    columnProps: {
      columnChecked: true,
      columnNames: [],
      columnMethod: '',
      columnType: [],
    },
    tblCheck: false,
    tblName: '',
    tableMethod: '',
    dataProps: {
      dataChecked: false,
      dataMethod: '',
      dataInsertion: '',
    },
  };
  @Output() globalModelChange = new EventEmitter<GlobalFormModel>();

  @Output() tblSubmit = new EventEmitter<GlobalFormModel>();

  constructor() {}

  ngOnInit(): void {}

  tblTrigger(tblformValid: boolean, colCheck: boolean) {
    // console.log(tblRadio);
    // console.log(this.globalModel.tblName);
    // console.log(formValid);
    if (colCheck == true) {
      this.globalModel.ngFormValidations.push(tblformValid);
      this.globalModel.columnProps.columnChecked = colCheck;

      this.globalModelChange.emit(this.globalModel);
      console.log(this.globalModel);
    } else {
      this.globalModel.columnProps.columnChecked = colCheck;
      this.globalModel.ngFormValidations.pop();
      this.globalModelChange.emit(this.globalModel);
    }
  }

  onSubmit(tblForm: NgForm) {
    this.globalModel.ngFormValidations.push(tblForm.valid);
    this.tblSubmit.emit(this.globalModel);
  }
}
