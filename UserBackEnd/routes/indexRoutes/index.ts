import express from "express";
const router = express.Router();
import sqlContentClass from "../globalJS/sqlContentClass";

router.get("/", (req, res) => {
  const sqlContentC = new sqlContentClass();
  console.log("here in router");
  sqlContentC
    .queryIndexDynamicData()
    .then((resolve) => {
      console.log(resolve);
      res.render("index", resolve);
    })
    .catch((err) => {
      console.log(err);
      res.render("index", err);
    });
});

export default router;
