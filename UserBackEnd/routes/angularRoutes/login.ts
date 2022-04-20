import express from "express";
const router = express.Router();
import mysql from "mysql2/promise";

router.post("/", (req, res, next) => {
  console.log(req.body);
  passwordAndUserCheck(req.body)
    .then((resolve) => userInfo(req.body))
    .then((resolve) => res.json(resolve))
    .catch((err) => res.json(err));
});

async function passwordAndUserCheck(userPass: {
  username: string;
  password: any;
}) {
  const connection: any = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const userRes: any = await connection.execute(
    `SELECT users.Username FROM users WHERE users.Username = ?`,
    [userPass.username]
  );

  const passResult: any = await connection.execute(
    `SELECT users.Password FROM users WHERE users.Password = ? AND users.Username = ?`,
    [userPass.password, userPass.username]
  );

  if (userRes[0].length == 0) {
    return Promise.reject({
      message: "No user named: " + userPass.username,
    });
  } else {
    console.log(userRes[0]);
  }

  if (passResult[0].length == 0) {
    return Promise.reject({
      message: "Password not matching for: " + userPass.username,
    });
  } else {
    console.log(passResult[0]);
    connection.end();
    return Promise.resolve();
  }
}

async function userInfo(fields: { username: any }) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultUserInfo: any = await connection.execute(
    `SELECT u.Username,  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`,
    [fields.username]
  );

  const oszp_id: string = queryResultUserInfo[0][0]["D_L_P"];

  const queryResultApps = await connection.execute("SELECT * FROM app");

  const queryResultAppRights = await connection.execute(
    `SELECT ar.AppName, dlp.AppRights
    FROM d_l_p_rights AS dlp
    JOIN apprights AS ar
    ON ar.Rights = dlp.AppRights
    WHERE dlp.D_L_P = ?`,
    [oszp_id]
  );

  connection.end();

  console.log(queryResultAppRights[0]);

  return {
    loginInfo: queryResultUserInfo[0],
    appsInfo: queryResultApps[0],
    userAppRights: queryResultAppRights[0],
  };
}

export default router;
