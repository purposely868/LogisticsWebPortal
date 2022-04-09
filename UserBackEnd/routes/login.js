const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.post("/", function (req, res, next) {
  loginquery(req, res);
});

async function loginquery(req, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultlogin = await connection.execute(
    `SELECT  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM login AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`,
    [req.body.username]
  );

  const oszp_id = queryResultlogin[0][0]["D_L_P"];

  const queryResultapps = await connection.execute("SELECT * FROM app");

  const queryResultapprights = await connection.execute(
    `SELECT ar.AppName, dlp.AppRights
    FROM d_l_p_rights AS dlp
    JOIN apprights AS ar
    ON ar.Rights = dlp.AppRights
    WHERE dlp.D_L_P = ?`,
    [oszp_id]
  );

  connection.end();

  console.log(oszp_id);

  res.send(
    JSON.stringify({
      loginInfo: queryResultlogin[0],
      appsInfo: queryResultapps[0],
      userAppRights: queryResultapprights[0],
    })
  );
}

module.exports = router;
