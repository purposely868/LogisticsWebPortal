"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sqlContentClass_1 = __importDefault(require("../globalJS/sqlContentClass"));
router.get("/", (req, res) => {
    const sqlContentC = new sqlContentClass_1.default();
    console.log("here in router");
    sqlContentC
        .queryIndexDynamicData()
        .then((resolve) => {
        console.log(resolve);
        res.render("index", resolve);
    })
        .catch((err) => {
        console.log(err);
        res.render("index", err);
    });
});
exports.default = router;
