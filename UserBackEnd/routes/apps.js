const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const path = require("path");

// getting the appropriate app view depending on the DLP(OSZP)
router.post("/", function (req, res, next) {
  appQuery(req, res);
});

async function appQuery(req, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const appRightsQuery = await connection.execute(
    `SELECT ar.AppName, dlp.AppRights
            FROM d_l_p_rights AS dlp
            JOIN apprights AS ar
            ON ar.Rights = dlp.AppRights
            WHERE dlp.D_L_P = ?`,
    [req.body.O_SZ_P]
  );

  appView(res);
}

function appView(res) {
  res.sendFile(
    "C:\\Users\\Testi\\Desktop\\programming\\Own\\Angular\\componentsForWebPortal\\User\\UserBackEnd\\public\\dist\\user_front\\browser\\index.html"
  );
}

module.exports = router;
