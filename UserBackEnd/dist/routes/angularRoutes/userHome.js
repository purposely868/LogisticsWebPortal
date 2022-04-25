"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sqlContentClass_1 = __importDefault(require("../globalJS/sqlContentClass"));
// Render user page back after succesful login
router.get("/", (req, res) => {
    const sqlCC = new sqlContentClass_1.default();
    // general new and updates to all user.
    sqlCC
        .UserHomeGeneralContent()
        .then((resolve) => {
        //console.log(resolve);
        res.json({ error: false, info: resolve });
    })
        .catch((err) => {
        //console.log(err);
        res.json({ error: true, info: err });
    });
});
exports.default = router;
