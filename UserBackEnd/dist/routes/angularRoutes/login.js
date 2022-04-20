"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const promise_1 = __importDefault(require("mysql2/promise"));
router.post("/", (req, res, next) => {
    console.log(req.body);
    passwordAndUserCheck(req.body)
        .then((resolve) => userInfo(req.body))
        .then((resolve) => res.json(resolve))
        .catch((err) => res.json(err));
});
function passwordAndUserCheck(userPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        const userRes = yield connection.execute(`SELECT users.Username FROM users WHERE users.Username = ?`, [userPass.username]);
        const passResult = yield connection.execute(`SELECT users.Password FROM users WHERE users.Password = ? AND users.Username = ?`, [userPass.password, userPass.username]);
        if (userRes[0].length == 0) {
            return Promise.reject({
                message: "No user named: " + userPass.username,
            });
        }
        else {
            console.log(userRes[0]);
        }
        if (passResult[0].length == 0) {
            return Promise.reject({
                message: "Password not matching for: " + userPass.username,
            });
        }
        else {
            console.log(passResult[0]);
            connection.end();
            return Promise.resolve();
        }
    });
}
function userInfo(fields) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        const queryResultUserInfo = yield connection.execute(`SELECT u.Username,  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`, [fields.username]);
        const oszp_id = queryResultUserInfo[0][0]["D_L_P"];
        const queryResultApps = yield connection.execute("SELECT * FROM app");
        const queryResultAppRights = yield connection.execute(`SELECT ar.AppName, dlp.AppRights
    FROM d_l_p_rights AS dlp
    JOIN apprights AS ar
    ON ar.Rights = dlp.AppRights
    WHERE dlp.D_L_P = ?`, [oszp_id]);
        connection.end();
        console.log(queryResultAppRights[0]);
        return {
            loginInfo: queryResultUserInfo[0],
            appsInfo: queryResultApps[0],
            userAppRights: queryResultAppRights[0],
        };
    });
}
exports.default = router;
