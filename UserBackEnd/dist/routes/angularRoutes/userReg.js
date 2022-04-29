"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sqlClass_1 = __importDefault(require("../globalJS/sqlClass"));
// This is for the user management app.
// Where you register users and check their info
// pluss validation info reg
// Routes
router.get("/frontvalidation", (req, res) => {
    // teljes front validation tartalom
    const sqlC = new sqlClass_1.default("users", req.session);
    Promise.all([
        sqlC.UserValidation(),
        sqlC.PasswordValidation(),
        sqlC.AllOszps(),
    ])
        .then((resolve) => {
        console.log(resolve);
        res.json(resolve);
        sqlC.poolClose();
    })
        .catch((err) => {
        res.json(err);
        sqlC.poolClose();
    });
});
router.post("/register", (req, res) => {
    console.log(req.body);
    const sqlC = new sqlClass_1.default("users", req.session);
    console.log("here reg");
    sqlC
        .userRegister(req.body)
        .then((resolve) => {
        console.log(resolve);
        res.json({ error: false, info: resolve });
        sqlC.poolClose();
    })
        .catch((err) => {
        //console.log(err);
        console.log(err);
        res.send({ error: true, info: err });
        sqlC.poolClose();
    });
});
router.put("/information", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userInformation(req.body.username)
        .then((resolve) => {
        res.json(resolve);
        sqlC.poolClose();
    })
        .catch((err) => {
        res.json(err);
        sqlC.poolClose();
    });
});
router.put("/update", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userUpdate(req.body)
        .then((resolve) => {
        res.json({ error: false, info: resolve });
        sqlC.poolClose();
    })
        .catch((err) => {
        res.json({ error: false, info: err });
        sqlC.poolClose();
    });
});
router.delete("/delete", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userDelete(req.body.userName)
        .then((resolve) => {
        res.json({ error: false, info: "Deleted" });
        sqlC.poolClose();
    })
        .catch((err) => {
        console.log(err);
        res.status(404);
        res.json({ error: false, info: err });
        sqlC.poolClose();
    });
});
router.get("/info/:target", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .informations(req.params.target, req.body.Username)
        .then((resolved) => {
        res.json(resolved);
        sqlC.poolClose();
    })
        .catch((err) => {
        res.status(404);
        res.send(err);
        sqlC.poolClose();
    });
});
exports.default = router;
