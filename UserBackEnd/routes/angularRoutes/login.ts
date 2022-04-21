import express from "express";
const router = express.Router();
import sqlClass from "./globalJS/sqlClass";

router.post("/", (req, res) => {
  console.log(req.body);
  const val = new sqlClass();

  val
    .passwordCheck(req.body.password, req.body.username)
    .then((resolve) => {
      //console.log(resolve);
      res.json({ error: false, info: resolve });
    })
    .catch((err) => {
      //console.log(err);
      res.json({ error: true, info: err });
    });
});

export default router;
