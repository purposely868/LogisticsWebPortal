const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Render user page back after succesful login
router.post("/", (req, res, next) => {
  userInfo(req, res).then((resolve) => {
    res.render("userHome", resolve);
  });
});

async function userInfo(req, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultUserInfo = await connection.execute(
    `SELECT  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`,
    [req.body.username]
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
    title: "User Home",
    loginInfo: queryResultUserInfo[0][0],
    appsInfo: queryResultApps[0],
    userAppRights: queryResultAppRights[0],
  };
}

module.exports = router;
