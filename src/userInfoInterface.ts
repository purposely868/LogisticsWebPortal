export default interface userInfo {
  [x: string]: any;
  loginInfo: {
    D_L_P: number;
    DepartmentName: string;
    FirstN: string;
    LastN: string;
    Email: string;
    Phone: string | null;
    PositionName: string;
  };
  userAppRights: { AppName: string; AppRights: string }[];
  allApps: { AppName: string; AppDiscription: string }[];
}
