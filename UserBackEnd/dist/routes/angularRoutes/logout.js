"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
