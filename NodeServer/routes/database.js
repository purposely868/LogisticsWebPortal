const express = require("express");
const router = express.Router();
const mysql2 = require("mysql2/promise");

// create the connection? i dont know the details.

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("database", { title: "DatabaseView" });
});

router.get("/dbs/", function (req, res, next) {
  promiseMSQL(req.query, 0).then((resolve) => {
    res.setHeader("Content Type", "application/json");
    res.send(resolve);
  });
});

// ====================================
router.get("/tbl/", (req, res, next) => {
  console.log(req.query);

  promiseMSQL(req.query, 0)
    .then(() => {
      return promiseMSQL(req.query, 1);
    })
    .then((resolved) => {
      res.setHeader("Content Type", "application/json");
      res.send(resolved);
    });
});

router.get("/col/", (req, res, next) => {
  // console.log(req);
  // console.log(req.params);
  console.log(req.query);

  promiseMSQL(req.query, 0)
    .then(() => promiseMSQL(req.query, 1))
    .then(() => promiseMSQL(req.query, 2))
    .then((resolved) => {
      res.setHeader("Content-Type", "application/json");
      res.send(resolved);
    });
});
router.get("/dat/", (req, res, next) => {
  console.log(req);
  console.log(req.params);
  console.log(req.query.dbsName);
  res.send("fuck you");
});

// ========================================================
// sets the right connection, connects the chooses the calls the query selector
async function promiseMSQL(query, counter) {
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1asxqklp546",
    database: `${counter != 0 ? query.dbsName : ""}`,
  });
  let response = {};
  let sql = "";
  // console.log(counter);

  connection.connect();
  sql = querySelecter(counter, query);
  response = await connection.query(sql);

  await connection.end();
  return response;
}

// gives back the right query
function querySelecter(counter, query) {
  if (counter == 0 && query.dbsMethod != "exists") {
    switch (query.dbsMethod) {
      case "create":
        return `CREATE DATABASE ${query.dbsName}`;

      case "delete":
        return `DROP DATABASE ${query.dbsName}`;

      case "check":
        return `SELECT SCHEMA_NAME
        FROM INFORMATION_SCHEMA.SCHEMATA
       WHERE SCHEMA_NAME = '${query.dbsName}'`;

      default:
        break;
    }
  } else if (counter == 1 && query.tblMethod != "exists") {
    switch (query.tblMethod) {
      case "create":
        return `CREATE TABLE ${query.tblName} (id INT AUTO_INCREMENT PRIMARY KEY)`;

      case "delete":
        return `DROP TABLE ${query.tblName}`;

      case "check":
        return `SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE
     FROM 
        information_schema.TABLES 
     WHERE 
        TABLE_SCHEMA LIKE '${query.dbsName}'    AND 
       TABLE_TYPE LIKE 'BASE TABLE' AND
       TABLE_NAME = '${query.tblName}';`;

      default:
        break;
    }
  } else if (counter == 2 && query.colMethod != "exists") {
    switch (query.colMethod) {
      case "create":
        // console.log("create");
        return `ALTER TABLE ${query.tblName} ADD ${query.colName} ${query.colType}(255)`;

      case "delete":
        return `ALTER TABLE ${query.tblName} DROP COLUMN ${query.colName}`;

      case "check":
        return `SHOW COLUMNS FROM '${query.tblName}' LIKE '${query.colName}'`;

      default:
        break;
    }
  }
}

module.exports = router;
