export default interface UserData {
  [x: string]: any;
  userInfo: {
    [x: string]: any;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    oszp: number;
  };
  posInfo: {
    [x: string]: any;
    departmentName: string;
    pozLevel: number;
    pozitionName: string;
    pozitionDiscription: string;
    appName: string;
    rights: string[];
  };
}
