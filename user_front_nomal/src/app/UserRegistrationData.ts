export default interface UserRegistrationData {
  [x: string]: string | number | null;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  password: string;
  oszp: number;
}
