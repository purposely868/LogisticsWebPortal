import express from "express";
const router = express.Router();
import sqlClass from "../globalJS/sqlClass";

router.post("/", (req, res) => {
  console.log(req.body);
  //req.session.username = "username" in req.session ? "hello" : null;

  const val = new sqlClass("users", req.session);

  val
    .passwordCheck(req.body.password, req.body.username, req.session)
    .then((resolve) => {
      // now it is time to get user data then store it in the session storage of the browser
      console.log(resolve);
      console.log(req.body.username);

      return val.userInformation(req.body.username);
    })
    .then((resolve) => {
      return val.appInfo().then((appResolve) => {
        console.log(appResolve);
        console.log(resolve);

        res.json({ error: false, info: resolve, appinfo: appResolve });
        val.poolClose();
      });
      // final resolve with the user info
    })
    .catch((err) => {
      //console.log(err);

      res.json({ error: true, info: err });
      val.poolClose();
    });
});

export default router;
