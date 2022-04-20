import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("/");
});

export default router;
