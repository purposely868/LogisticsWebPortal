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
// Render user page back after succesful login
router.post("/", (req, res, next) => {
    userInfo(req, res).then((resolve) => {
        res.render("userHome", resolve);
    });
});
function userInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        const queryResultUserInfo = yield connection.execute(`SELECT  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, 
    dlp.DepartmentName, dlp.PozitionName
    FROM users AS u
    JOIN dep_lev_poz AS dlp
    ON u.D_L_P = dlp.D_L_P_ID
    WHERE Username = ?`, [req.body.username]);
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
            title: "User Home",
            loginInfo: queryResultUserInfo[0][0],
            appsInfo: queryResultApps[0],
            userAppRights: queryResultAppRights[0],
        };
    });
}
exports.default = router;
