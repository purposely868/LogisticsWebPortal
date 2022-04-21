import express from "express";
import { Request } from "express-serve-static-core";
const router = express.Router();
import mysql from "mysql2/promise";
import { ParsedQs } from "qs";

// Render user page back after succesful login
router.post("/", (req, res) => {
  userInfo(req).then((resolve) => {
    res.render("userHome", resolve);
  });
});

async function userInfo(
  req: Request<{}, any, any, ParsedQs, Record<string, any>>
) {
  const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });

  const [queryResultUserInfo] = await connection.execute(
    `SELECT  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`,
    [req.body.username]
  );

  const oszp_id = (queryResultUserInfo as mysql.RowDataPacket[])[0]["D_L_P"];

  const [queryResultAppRights] = await connection.execute(
    `SELECT ar.AppName, dlp.AppRights
    FROM d_l_p_rights AS dlp
    JOIN apprights AS ar
    ON ar.Rights = dlp.AppRights
    WHERE dlp.D_L_P = ?`,
    [oszp_id]
  );

  const queryResultApps: any = await connection.execute("SELECT * FROM app");

  connection.end();

  console.log(queryResultUserInfo);
  console.log(queryResultAppRights);
  console.log(queryResultApps);

  return {
    loginInfo: (queryResultUserInfo as mysql.RowDataPacket[])[0],
    userAppRights: (queryResultAppRights as mysql.RowDataPacket[])[0],
    allApps: queryResultApps[0],
  };
}

export default router;
