export class GlobalFormModel {
  constructor(
    public ngFormValidations: any[],
    public dbsName: string,
    public dbsMethod: string,
    public tblCheck: boolean,
    public tblName: string,
    public tableMethod: string,
    public columnProps: {
      columnChecked: boolean;
      columnNames: string[];
      columnMethod: string;
      columnType: string[];
    },
    public dataProps: {
      dataChecked: boolean;
      dataMethod: string;
      dataInsertion: any;
    }
  ) {}
}
