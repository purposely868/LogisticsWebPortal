"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlClass_1 = __importDefault(require("../globalJS/sqlClass"));
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    const val = new sqlClass_1.default("users", req.session);
    req.session.reload((err) => {
        if (err) {
            console.log(err);
            res.json({ error: true, info: "No User Session" });
            val.poolClose();
        }
        else {
            val
                .userInformation(req.session.username)
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
exports.default = router;
