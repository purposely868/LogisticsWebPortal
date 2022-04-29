import express from "express";
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("generalView", { title: "About Us" });
});

router.get("/contact", (req, res) => {
  res.render("generalView", { title: "Contact Us" });
});

router.get("/legalinfo/:info", (req, res, next) => {
  switch (req.params.info) {
    case "privacy":
      res.render("generalView", { title: "Privacy Policy" });
      break;
    case "cookies":
      res.render("generalView", { title: "Cookie Policy" });
      break;
    case "impressum":
      res.render("generalView", { title: "Impressum" });
      break;
    default:
      next();
      break;
  }
});

router.get("/companylogin", (req, res) => {
  res.render("generalView", { title: "Copany Login" });
});

export default router;
