import express from "express";
import { Request, Response } from "express-serve-static-core";
const router = express.Router();
import mysql from "mysql2/promise";
import { ParsedQs } from "qs";

// Render user page back after succesful login
router.post("/", (req, res, next) => {
  userInfo(req, res).then((resolve) => {
    res.render("userHome", resolve);
  });
});

async function userInfo(
  req: Request<{}, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultUserInfo: any = await connection.execute(
    `SELECT  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`,
    [req.body.username]
  );

  const oszp_id: string = queryResultUserInfo[0][0]["D_L_P"];

  const queryResultApps: any = await connection.execute("SELECT * FROM app");

  const queryResultAppRights: any = await connection.execute(
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

export default router;
