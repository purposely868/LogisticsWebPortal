import { Injectable } from '@angular/core';
import { GlobalFormModel } from './global_form_model';

@Injectable({
  providedIn: 'root',
})
export class DbServerRequestsService {
  constructor() {}

  async dbsHandler(model: GlobalFormModel) {
    const res = await fetch(
      `http://localhost:3000/angular/dbs?dbsName=${model.dbsName}&dbsMethod=${model.dbsMethod}`,
      { mode: 'cors' }
    );
    console.log(res);
    const res_1 = await res.json();
    return res_1;
  }

  async tblHandler(model: GlobalFormModel) {
    const resolved = await fetch(
      `http://localhost:3000/angular/tbl?dbsName=${model.dbsName}&dbsMethod=${model.dbsMethod}&tblName=${model.tblName}&tblMethod=${model.tableMethod}`,
      { mode: 'cors' }
    );
    const resolved_1 = await resolved.json();
    console.log(resolved_1);
    return resolved_1;
  }

  async colHandler(model: GlobalFormModel) {
    return await fetch(
      `http://localhost:3000/angular/col?dbsName=${model.dbsName}&dbsMethod=${model.dbsMethod}&tblName=${model.tblName}&tblMethod=${model.tableMethod}&colName=${model.columnProps.columnNames[0]}&colMethod=${model.columnProps.columnMethod}&colType=${model.columnProps.columnType[0]}`,
      { mode: 'cors' }
    );
  }

  async datHandler(model: GlobalFormModel) {
    return await fetch(
      `http://localhost:3000/angular/dat?dbsName=${model.dbsName}&dbsMethod=${model.dbsMethod}&tblName=${model.tblName}&tblMethod=${model.tableMethod}&colName=${model.columnProps.columnNames}&colMethod=${model.columnProps.columnMethod}&colType=${model.columnProps.columnType}&datName=${model.dataProps.dataInsertion}&datMethod=${model.dataProps.dataInsertion}`,
      { mode: 'cors' }
    );
  }
}
