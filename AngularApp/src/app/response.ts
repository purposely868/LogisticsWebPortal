export interface GlobalInterface {
  ngFormValidations: any[];
  dbsName: string;
  tblName: string;
  dbsMethod: string;
  tblCheck: boolean;
  tableMethod: string;
  columnProps: {
    columnChecked: boolean;
    columnNames?: string[];
    columnMethod?: string;
    columnType?: string[];
  };
  dataProps?: {
    dataChecked: boolean;
    dataInsertion: any;
  };
}
