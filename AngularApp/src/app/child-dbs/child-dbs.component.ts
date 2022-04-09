import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalFormModel } from '../global_form_model';

import { GlobalInterface } from '../response';

@Component({
  selector: 'app-child-dbs',
  templateUrl: './child-dbs.component.html',
  styleUrls: ['./child-dbs.component.css'],
})
export class ChildDbsComponent implements OnInit {
 
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

  @Output() dbsSubmit = new EventEmitter<GlobalFormModel>();


  ngOnInit(): void {}

  forwardTbl(tblchecked: boolean, formvalid: boolean) {
    if (tblchecked == true) {
      this.globalModel.tblCheck = tblchecked;
      this.globalModel.ngFormValidations.push(formvalid);

      this.globalModelChange.emit(this.globalModel);
      console.log(this.globalModel);
    } else {
      this.globalModel.tblCheck = tblchecked;
      this.globalModel.ngFormValidations.pop();
      this.globalModelChange.emit(this.globalModel);
    }
  }

  onSubmit(dbsForm: NgForm){
    this.globalModel.ngFormValidations.push(dbsForm.valid);
    this.dbsSubmit.emit(this.globalModel);
  }
}
