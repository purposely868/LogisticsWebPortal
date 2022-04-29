import express from "express";
import sqlClass from "../globalJS/sqlClass";
const router = express.Router();

router.get("/", (req, res, next) => {
  const val = new sqlClass("users", req.session);

  req.session.reload((err: any) => {
    if (err) {
      console.log(err);

      res.json({ error: true, info: "No User Session" });
      val.poolClose();
    } else {
      val
        .userInformation((req.session as any).username)
        .then((resolve) => {
          res.json({ error: false, info: resolve });
          val.poolClose();
          // return val.appInfo().then((appResolve) => {

          //   res.json({ error: false, info: resolve, appinfo: appResolve });
          // });
          // final resolve with the user info
        })
        .catch((err) => {
          res.json({ error: true, info: err });
          val.poolClose();
        });
    }
  });
});

export default router;
