import express from "express";
const router = express.Router();

import sqlClass from "./globalJS/sqlClass";
import frontValidClass from "./globalJS/validationsChecks";

// This is for the user management app.
// Where you register users and check their info
// pluss validation info reg

// Routes
router.get("/frontvalidation", (req, res) => {
  // teljes front validation tartalom
  const val = new frontValidClass();
  Promise.all([val.UserValidation(), val.PasswordValidation(), val.AllOszps()])
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/register", (req, res) => {
  const sqlC = new sqlClass();

  sqlC
    .userRegister(req.body)
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((err) => {
      //console.log(err);
      res.send(err);
    });
});

router.put("/information", (req, res) => {
  const sqlC = new sqlClass();

  sqlC
    .userInformation(req.body.username)
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update", (req, res) => {
  const sqlC = new sqlClass();

  sqlC
    .userUpdate(req.body)
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete", (req, res) => {
  const sqlC = new sqlClass();

  sqlC
    .userDelete(req.body.Username)
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
      res.json(err);
    });
});

router.get("/info/:target", (req, res) => {
  const sqlC = new sqlClass();

  sqlC
    .informations(req.params.target, req.body.Username)
    .then((resolved) => {
      res.json(resolved);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});

export default router;
