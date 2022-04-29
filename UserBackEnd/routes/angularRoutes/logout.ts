import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(req.sessionID);
  console.log(req.session);

  // storeSQL.destroy(req.sessionID, (err: any) => {
  //   console.log(req.session);
  // });

  req.session.destroy((err) => {
    console.log(err);

    res.json({ deleted: "Deleted" });
  });
});

export default router;
