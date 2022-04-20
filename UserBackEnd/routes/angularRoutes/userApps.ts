import express from "express";
import { Request, Response } from "express-serve-static-core";
const router = express.Router();
import mysql from "mysql2/promise";
import { ParsedQs } from "qs";

// getting the appropriate app view depending on the DLP(OSZP)
router.post("/", function (req, res, next) {
  appQuery(req, res);
});

async function appQuery(
  req: Request<{}, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) {
  const connection: any = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const appRightsQuery: any = await connection.execute(
    `SELECT ar.AppName, dlp.AppRights
            FROM d_l_p_rights AS dlp
            JOIN apprights AS ar
            ON ar.Rights = dlp.AppRights
            WHERE dlp.D_L_P = ?`,
    [req.body.O_SZ_P]
  );

  appView(res);
}

function appView(res: Response<any, Record<string, any>, number>) {
  res.sendFile(
    "C:\\Users\\Testi\\Desktop\\programming\\Own\\Angular\\componentsForWebPortal\\User\\UserBackEnd\\public\\dist\\user_front\\browser\\index.html"
  );
}

export default router;
