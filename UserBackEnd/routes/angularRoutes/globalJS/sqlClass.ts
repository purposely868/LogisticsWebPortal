import mysql from "mysql2/promise";
import FrontValid from "./validationsChecks";

interface requestBody {
  [index: string]: string | number | undefined;
  Username?: string;
  FirstN?: string;
  LastN?: string;
  Email?: string;
  Phone?: string;
  D_L_P?: number;
  Password?: string;
}

export default class sqlClass extends FrontValid {
  constructor() {
    super();
  }

  // REGISTER =================
  async userRegister(user: requestBody) {
    //console.log(user);
    if (await this.userThere(user.Username!)) {
      //console.log("in user register");
      // query
      const userInfo = await this._connection
        .execute(
          `INSERT INTO
            users(Username, FirstN, LastN, Email, Phone, D_L_P,   Password)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            user.Username,
            user.FirstN,
            user.LastN,
            user.Email,
            user.Phone,
            user.D_L_P,
            user.Password,
          ]
        )
        .then(() => {
          //console.log("in user reg resolved");
          return this.userInformation(user.Username!);
        });

      // final return
      return userInfo;
    } else {
      this._connection.end();
      return this.sqlErrorHandle(new Error("This user already exists"));
    }
  }

  // UPDATE =================
  async userUpdate(user: requestBody) {
    let queryUpdate = "UPDATE users SET";
    let updateValues = [];
    let reqKeys = Object.keys(user);

    if (!(await this.userThere(user.Username!))) {
      for (let i = 0; i < reqKeys.length; i++) {
        // console.log(reqKeys[i]);
        if (reqKeys[i] != "Username") {
          //length min 2 username + other column
          queryUpdate += ` ${reqKeys[i]} = ?`;
          updateValues.push(user[reqKeys[i]]);
          if (i != reqKeys.length - 1) queryUpdate += ",";
        }
      }

      queryUpdate += ` WHERE Username = "${user.Username}"`;

      const updateResult = await this._connection
        .execute(queryUpdate, updateValues)
        .then((resolve) => {
          console.log(resolve);
          return resolve;
        });

      return updateResult;
    } else {
      return this.sqlErrorHandle(new Error("This user does not exist "));
    }
  }

  // DELETE =================
  async userDelete(username: string) {
    if (!(await this.userThere(username!))) {
      const userDelete = this._connection
        .execute("DELETE FROM users WHERE Username = ?", [username])
        .then((resolve) => {
          return resolve;
        });
      return userDelete;
    } else {
      return this.sqlErrorHandle(new Error("This user does not exist "));
    }
  }

  // O_SZ_P and apps and rights Information after reg, del, update the user
  async userInformation(username: string) {
    //This gets requested after submitting the registration and updateing a user and if every thing went ok.
    //Additionally this gets called when somebodey searches for an individual user

    // needs Username only

    // IMPORTAN: i have to wait for the connection to establis because
    // .execute can only work if the connection is ready. It is not like .then

    const returnOszpInfo: { [index: string]: any } = {
      DepartmentName: "",
      PozLevel: 0,
      PozitionName: "",
      PozitionDiscription: "",
      AppName: "",
      Rights: [],
    };

    const returnUserDetails: { [index: string]: any } = {
      Username: "",
      FirstN: "",
      LastN: "",
      Email: "",
      Phone: "",
      Password: "",
      D_L_P: "",
    };
    // console.log(username + " " + "in userInformation");
    // query1 user Details =======
    const userDetails = await this._connection
      .execute(`SELECT * FROM users WHERE Username = ?`, [username])
      .then((resolve) => {
        for (const key in (resolve[0] as mysql.RowDataPacket[])[0]) {
          returnUserDetails[key] = (resolve[0] as mysql.RowDataPacket[])[0][
            key
          ];
          //   console.log(key);
          //   console.log(returnUserDetails[key]);
        }
        return returnUserDetails;
      });

    // query2 DLP details =======
    const queryResult = await this._connection
      .execute(
        `SELECT dlp.DepartmentName, dlp.PozLevel, dlp.PozitionName, dlp.PozitionDiscription, ar.AppName, ar.Rights
    FROM dep_lev_poz as dlp
    JOIN d_l_p_rights as dlpr
    ON dlp.D_L_P_ID = dlpr.D_L_P
    JOIN apprights as ar
    ON dlpr.AppRights = ar.Rights
    WHERE dlp.D_L_P_ID = ?`,
        [returnUserDetails["D_L_P"]]
      )
      .then((resolve: any[]) => {
        // végig megy az összes soron úgy, hogy figyelembe veszi azt, ha az embernek több jogosultsága van.

        for (let i = 0; i < (resolve[0] as mysql.RowDataPacket[]).length; i++) {
          const element = resolve[0][i];

          if (i == 0) {
            for (const key in element) {
              if (key != "Rights") returnOszpInfo[key] = element[key];
            }
          }
          returnOszpInfo.Rights.push(element.Rights);
        }
        this._connection.end();
        return returnOszpInfo;
      });

    // Akkor lessz sikeres ha minden Promise Resolved.
    // Viszont egy Reject esetén is azonnal leáll és Rejectként adja vissza az egészet az első Reject értékével

    return Promise.all([userDetails, queryResult]);
  }

  // Send Information about apps rights and oszps
  async informations(target: string, username?: string) {
    let queryResult: any[] = [];

    switch (target) {
      case "alloszp":
        queryResult = await this._connection.execute(`SELECT *
                          FROM dep_lev_poz`);
        break;

      case "allusers":
        queryResult = await this._connection.execute(`SELECT *
                          FROM users`);
        break;

      case "allappsrigths":
        queryResult = await this._connection.execute(`SELECT *
                          FROM appsrights`);
        break;
      case "userinfo":
        if (!(await this.userThere(username!))) {
          queryResult = await this._connection.execute(
            `SELECT * FROM users WHERE Username = ?`,
            [username]
          );
        } else {
          return this.sqlErrorHandle(new Error("This user does not exist "));
        }
        break;
      default:
        return Promise.reject(new Error("Nincs Ilyen Opció"));
    }
    //console.log(queryResult);
    this._connection.end();
    return queryResult[0];
  }
}
