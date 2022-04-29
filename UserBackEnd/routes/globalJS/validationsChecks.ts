import mysql2, { createPool, Pool } from "mysql2/promise";
import Hashing from "./hashing";

export default class FrontValid {
  protected _connection: Pool;

  constructor(dbName: string, req: any) {
    this._connection = mysql2.createPool({
      host: "localhost",
      user: "root",
      database: `${dbName}`,
      password: "1asxqklp546",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  // Check user if exists
  async userThere(username: string) {
    return await this._connection
      .execute(
        `SELECT Username FROM users WHERE EXISTS (SELECT Username FROM users WHERE Username = ?)`,
        [username]
      )
      .then((resolve) => {
        // console.log(resolve);
        return (resolve[0] as mysql2.RowDataPacket[]).length !== 0
          ? true
          : false;
      });
  }

  // Check if password is the users password
  async passwordCheck(
    userInputPassword: string,
    username: string,
    requestSession: any
  ) {
    const hashLogic = new Hashing();

    // Important Dont change sessions before checking the credentials!
    // main logic
    if (await this.userThere(username)) {
      const pass = await this._connection
        .execute(`SELECT users.Password FROM users WHERE users.Username = ?`, [
          username,
        ])
        .then((resolved) => {
          // Here we take the result of the query
          const userPassDBS: string = (resolved[0] as mysql2.RowDataPacket[])[0]
            .Password;

          // Here we check for the inputted user pass to be correct or not
          return hashLogic.passwordCheck(userInputPassword, userPassDBS);
        })
        .then((resolvedPassword) => {
          // if user and password okey resolve logic
          console.log(resolvedPassword);

          // Changeing the request session so it will save the new session in the DBS and return the necesarry cookie(s).
          requestSession.username = username;

          // because the hashing function returns true or false we implement this logic
          if (resolvedPassword) {
            return "Password Matching";
          } else {
            return this.sqlErrorHandle(
              new Error("Password not matching for: " + username)
            );
          }
        });
      // any return.
      return pass;
    } else {
      return this.sqlErrorHandle(new Error("This user does not exist "));
    }
  }

  // All possible user information and constraints
  async UserValidation() {
    const userValid: { field: string; type: string; null: string }[] = [];

    const validationUsers = this._connection
      .execute(`SHOW COLUMNS FROM users`)
      .then((resolve: any) => {
        for (const iterator of resolve[0] as mysql2.RowDataPacket[]) {
          userValid.push({
            field: iterator.Field,
            type: iterator.Type,
            null: iterator.Null,
          });
        }
        return userValid;
      });

    return validationUsers;
  }

  // All possible OSZP's
  async AllOszps() {
    const allPosszibleOSZP: any[] = await this._connection.execute(`SELECT 	* 
    FROM dep_lev_poz as dlp`);

    return allPosszibleOSZP[0];
  }

  // Password validation options
  async PasswordValidation() {
    const validationPassword: any[] = await this._connection.execute(
      `SELECT * FROM passwordrules`
    );

    return validationPassword[0][0];
  }

  // Some sqlErrorHandling
  sqlErrorHandle(err: any) {
    // This is used to handle certain sql errors. Minimum checks, uniqueness and existense
    // Minimum length check is on the dbs-side
    console.log("here" + err.message);
    if (err.errno == 3819) {
      let indexLast = err.sqlMessage.lastIndexOf("_");
      let indexFirst = err.sqlMessage.indexOf("_");

      let errorMessage = `Minimum Character Length of ${err.sqlMessage.substring(
        indexFirst + 1,
        indexLast
      )} is ${err.sqlMessage.substring(indexFirst - 1, indexFirst)}`;

      return Promise.reject(errorMessage);
    } else if (err.code == "ER_DUP_ENTRY") {
      return Promise.reject(err.sqlMessage);
    } else if ("message" in err) {
      return Promise.reject(err.message);
    } else return Promise.reject(err);
  }
}
