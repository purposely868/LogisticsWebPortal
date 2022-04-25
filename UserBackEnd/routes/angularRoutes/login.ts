import express from "express";
const router = express.Router();
import sqlClass from "../globalJS/sqlClass";

router.post("/", (req, res) => {
  console.log(req.body);
  //req.session.username = "username" in req.session ? "hello" : null;

  const val = new sqlClass("users", req.session);

  console.log(req.cookies);
  console.log(req.session.cookie);
  console.log(req.headers.cookie);

  console.log(req.session);
  console.log(req.session.id);

  val
    .passwordCheck(req.body.password, req.body.username, req.session)
    .then((resolve) => {
      // now it is time to get user data then store it in the session storage of the browser
      console.log(resolve);

      return val.userInformation(req.body.username);
    })
    .then((resolve) => {
      // final resolve with the user info
      res.json({ error: false, info: resolve });
    })
    .catch((err) => {
      //console.log(err);
      res.json({ error: true, info: err });
    });
});

export default router;
