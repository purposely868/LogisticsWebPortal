import express from "express";
const router = express.Router();
import sqlContentClass from "../globalJS/sqlContentClass";

// Render user page back after succesful login
router.get("/", (req, res) => {
  const sqlCC = new sqlContentClass();

  // general new and updates to all user.
  sqlCC
    .UserHomeGeneralContent()
    .then((resolve) => {
      sqlCC.poolClose();
      //console.log(resolve);
      res.json({ error: false, info: resolve });
    })
    .catch((err) => {
      //console.log(err);
      sqlCC.poolClose();
      res.json({ error: true, info: err });
    });
});

export default router;
