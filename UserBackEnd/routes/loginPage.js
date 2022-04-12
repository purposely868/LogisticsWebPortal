const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Login page with ejs rendering
// password and username authentication and validation back end mainly
router.get("/", (req, res, next) => {
  res.render("login", { title: "Login Screen" });
});

router.post("/login", (req, res, next) => {
  passwordAndUserCheck(req, res);
});

async function passwordAndUserCheck(req, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const resultObject = [];

  const userRes = connection.execute(
    `SELECT users.Username FROM users WHERE users.Username = ?`,
    [req.body.username]
  );

  const passResult = connection.execute(
    `SELECT users.Password FROM users WHERE users.Password = ? AND users.Username = ?`,
    [req.body.password, req.body.username]
  );

  userRes
    .then((resolve) => {
      if (resolve[0].length == 0) {
        return Promise.reject("No user named: " + req.body.username);
      } else {
        resultObject[0] = true;

        return passResult;
      }
    })
    .then((resolve) => {
      if (resolve[0].length == 0) {
        return Promise.reject(
          "Password not matching for: " + req.body.username
        );
      } else {
        resultObject[1] = true;

        res.json(resultObject);
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}

module.exports = router;
