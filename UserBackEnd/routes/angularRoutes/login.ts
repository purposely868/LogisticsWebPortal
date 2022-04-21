import express from "express";
const router = express.Router();
import sqlClass from "./globalJS/sqlClass";

router.post("/", (req, res) => {
  console.log(req.body);
  const val = new sqlClass();

  val
    .passwordCheck(req.body.Password, req.body.Username)
    .then((resolve) => {
      //console.log(resolve);
      res.json(resolve);
    })
    .catch((err) => {
      //console.log(err);
      res.json(err);
    });
});

export default router;
