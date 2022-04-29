import bcrypt from "bcrypt";

export default class Hashing {
  constructor() {}

  async passwordHash(passwordInput: string) {
    // This is used when we register the user
    const saltRounds = 10;
    return bcrypt.hash(passwordInput, saltRounds);
  }

  async passwordCheck(passwordInput: string, hash: string) {
    // this is used when the user logges in
    return bcrypt.compare(passwordInput, hash);
  }
}
