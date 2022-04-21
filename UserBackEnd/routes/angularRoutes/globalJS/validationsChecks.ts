import mysql, { createPool, Pool } from "mysql2/promise";

export default class FrontValid {
  protected _connection: Pool;

  constructor() {
    this._connection = createPool({
      host: "localhost",
      user: "root",
      database: "users",
      password: "1asxqklp546",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  // Check user if exists
  async userThere(username: string) {
    const exists = await this._connection.execute(
      `SELECT Username FROM users WHERE EXISTS (SELECT Username FROM users WHERE Username = ?)`,
      [username]
    );
    // console.log(exists);
    return (exists[0] as mysql.RowDataPacket[]).length === 0 ? true : false;
  }

  // Check if password is the users password
  async passwordCheck(password: string, username: string) {
    if (!(await this.userThere(username))) {
      const pass = await this._connection
        .execute(
          `SELECT users.Password FROM users WHERE users.Password = ? AND users.Username = ?`,
          [password, username]
        )
        .then((resolved) => {
          if ((resolved[0] as mysql.RowDataPacket[]).length == 0) {
            console.log(resolved[0]);
            return this.sqlErrorHandle(
              new Error("Password not matching for: " + username)
            );
          } else {
            console.log(resolved[0]);

            this._connection.end();
            return "OK";
          }
        });

      // function normal return
      return pass;
    } else {
      return this.sqlErrorHandle(new Error("This user does not exist "));
    }
  }

  // All possible user information and constraints
  async UserValidation() {
    const userValid: { field: string; type: string; null: string }[] = [];

    const validationUsers = await this._connection
      .execute(`SHOW COLUMNS FROM users`)
      .then((resolve) => {
        for (const iterator of resolve[0] as mysql.RowDataPacket[]) {
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
    const allPosszibleOSZP: any[] = await this._connection
      .execute(`SELECT 	COUNT(D_L_P_ID) as NumberOfDLPs
    FROM dep_lev_poz as dlp`);

    return allPosszibleOSZP[0][0];
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
    this._connection.end();

    if (err.errno == 3819) {
      let indexLast = err.sqlMessage.lastIndexOf("_");
      let indexFirst = err.sqlMessage.indexOf("_");

      let errorMessage = `Minimum Character Length of ${err.sqlMessage.substring(
        indexFirst + 1,
        indexLast
      )} is ${err.sqlMessage.substring(indexFirst - 1, indexFirst)}`;

      return errorMessage;
    } else if (err.code == "ER_DUP_ENTRY") {
      return err.sqlMessage;
    } else if ("message" in err) {
      return err.message;
    } else return err;
  }
}
