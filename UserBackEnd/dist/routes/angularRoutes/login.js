"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sqlClass_1 = __importDefault(require("./globalJS/sqlClass"));
router.post("/", (req, res) => {
    console.log(req.body);
    const val = new sqlClass_1.default();
    val
        .passwordCheck(req.body.Password, req.body.Username)
        .then((resolve) => {
        console.log(resolve);
        res.json(resolve);
    })
        .catch((err) => {
        console.log(err);
        res.json(err);
    });
});
exports.default = router;
