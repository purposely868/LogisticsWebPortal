const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const formidable = require("formidable");

router.post("/", (req, res, next) => {
  //const form = formidable();

  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }

  //   console.log({ fields, files });
  // });
  console.log(req.body);
  passwordAndUserCheck(req.body)
    .then((resolve) => userInfo(req.body))
    .then((resolve) => res.json(resolve))
    .catch((err) => res.json(err));
});

async function passwordAndUserCheck(userPass) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const userRes = await connection.execute(
    `SELECT users.Username FROM users WHERE users.Username = ?`,
    [userPass.username]
  );

  const passResult = await connection.execute(
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

async function userInfo(fields) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultUserInfo = await connection.execute(
    `SELECT u.Username,  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`,
    [fields.username]
  );

  const oszp_id = queryResultUserInfo[0][0]["D_L_P"];

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

module.exports = router;
