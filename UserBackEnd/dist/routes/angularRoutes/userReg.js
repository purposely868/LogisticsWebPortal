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
        res.json(resolve);
    })
        .catch((err) => {
        res.json(err);
    });
});
router.post("/register", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userRegister(req.body)
        .then((resolve) => {
        res.json(resolve);
    })
        .catch((err) => {
        //console.log(err);
        res.send(err);
    });
});
router.put("/information", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userInformation(req.body.username)
        .then((resolve) => {
        res.json(resolve);
    })
        .catch((err) => {
        res.json(err);
    });
});
router.put("/update", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userUpdate(req.body)
        .then((resolve) => {
        res.json(resolve);
    })
        .catch((err) => {
        res.json(err);
    });
});
router.delete("/delete", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .userDelete(req.body.Username)
        .then((resolve) => {
        res.json(resolve);
    })
        .catch((err) => {
        console.log(err);
        res.status(404);
        res.json(err);
    });
});
router.get("/info/:target", (req, res) => {
    const sqlC = new sqlClass_1.default("users", req.session);
    sqlC
        .informations(req.params.target, req.body.Username)
        .then((resolved) => {
        res.json(resolved);
    })
        .catch((err) => {
        res.status(404);
        res.send(err);
    });
});
exports.default = router;
