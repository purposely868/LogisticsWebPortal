import { Component, Input, OnInit } from '@angular/core';
import { DbServerRequestsService } from '../db-server-requests.service';
import { GlobalFormModel } from '../global_form_model';

@Component({
  selector: 'app-db-parent',
  templateUrl: './db-parent.component.html',
  styleUrls: ['./db-parent.component.css'],
})
export class DbParentComponent implements OnInit {
  checkResponse: Boolean = false;
  collectiveResponseData: GlobalFormModel = new GlobalFormModel(
    [],
    '',
    '',
    false,
    '',
    '',
    { columnChecked: false, columnNames: [], columnMethod: '', columnType: [] },
    {
      dataChecked: false,
      dataMethod: '',
      dataInsertion: '',
    }
  );

  constructor(private dbRequest: DbServerRequestsService) {}
  ngOnInit(): void {}

  dbsSubmitHandle(dbsGlobObj: GlobalFormModel) {
    console.log(dbsGlobObj);
    console.log(this.dbRequest.dbsHandler(dbsGlobObj));
  }

  tblSubmitHandle(tlbGlobObj: GlobalFormModel) {
    console.log(tlbGlobObj);
    console.log(this.dbRequest.tblHandler(tlbGlobObj));
  }

  colSubmitHandle(colGlobObj: GlobalFormModel) {
    console.log(colGlobObj);
    console.log(this.dbRequest.colHandler(colGlobObj));
  }

  datSubmitHandle(datGlobObj: GlobalFormModel) {
    console.log(datGlobObj);
    console.log(this.dbRequest.datHandler(datGlobObj));
  }

  // requestDbs(){

  //   let result: any = {};

  //   switch ('create') {
  //     case 'create':
  //       result =
  //       console.log(result);
  //       // if (result instanceof Promise) {
  //       //   console.log('OK');
  //       // } else {
  //       //   console.log(result);
  //       // }
  //       break;
  //     case 'delete':
  //       result = ""
  //       break;
  //     case 'check':
  //       result = ""

  //       break;
  //     default:
  //       console.log('nothing');
  //       break;
  // }

  // dbsResult(dbeventResult: any) {
  //   console.log(dbeventResult);
  //   this.checkResponse = true;

  //   if (Array.isArray(dbeventResult) && dbeventResult.length !== 0) {
  //     console.log('OK');
  //     this.collectiveResponseData.push(
  //       `Found Database: ${dbeventResult[0]['SCHEMA_NAME']}`
  //     );
  //   } else if (!Array.isArray(dbeventResult)) {
  //     for (const key in dbeventResult) {
  //       if (Object.prototype.hasOwnProperty.call(dbeventResult, key)) {
  //         this.collectiveResponseData.push(`${key}: ${dbeventResult[key]}`);
  //       }
  //     }
  //   }
  // }

  tblResult(tbleventResult: any) {
    this.checkResponse = true;
    this.collectiveResponseData = tbleventResult;
    console.log(tbleventResult);
  }

  datResult(dateventResult: any) {
    this.checkResponse = true;
    this.collectiveResponseData = dateventResult;
    console.log(dateventResult);
  }

  // resetView() {
  //   this.checkResponse = false;
  //   this.collectiveResponseData = [];
  // }

  // async createServer(serverName: string) {
  //   this.respMain = await this.dbRequest.createRequest(serverName);

  // }

  dbsResultEventChach(eventResult: string) {
  
    // console.log(eventResult); it works with referencing.
    // console.log(this.collectiveResponseData);
  }
}
