const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Routes
router.post("/register", (req, res, next) => {
  userRegister(req, res, next);
});

router.put("/update", (req, res, next) => {
  userUpdate(req, res, next);
});
router.delete("/delete", (req, res, next) => {
  userDelete(req, res, next);
});

// Function Definitions:
// REGISTER =================
async function userRegister(req, res, next) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultUserReg = await connection.execute(
    `INSERT INTO
     users(Username, FirstN, LastN, Email, Phone, D_L_P,   Password)
     VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      req.body.Username,
      req.body.FirstN,
      req.body.LastN,
      req.body.Email,
      req.body.Phone,
      req.body.D_L_P,
      req.body.Password,
    ]
  );

  console.log(queryResultUserReg[0]);
  console.log(queryResultUserReg[1]);

  res.send("Reg Working");
}

// UPDATE =================
async function userUpdate(req, res, next) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  let queryUpdate = "UPDATE users SET";
  let updateValues = [];
  let reqKeys = Object.keys(req.body);

  for (let i = 0; i < reqKeys.length; i++) {
    // console.log(reqKeys[i]);
    if (reqKeys[i] != "Username") {
      //length min 2 username + other column
      queryUpdate += ` ${reqKeys[i]} = ?`;
      updateValues.push(req.body[reqKeys[i]]);
      if (i != reqKeys.length - 1) queryUpdate += ",";
    }
  }

  queryUpdate += ` WHERE Username = "${req.body.Username}"`;

  const queryResultUserUp = await connection.execute(queryUpdate, updateValues);

  console.log(queryResultUserUp[0]);
  //console.log(queryResultUserUp[1]);

  res.send("Up Working");
}

// DELETE =================
async function userDelete(req, res, next) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  const queryResultUserDel = await connection.execute(
    "DELETE FROM users WHERE Username = ?",
    [req.body.Username]
  );

  console.log(queryResultUserDel[0]);
  console.log(queryResultUserDel[1]);

  res.send("Del Working");
}

module.exports = router;
