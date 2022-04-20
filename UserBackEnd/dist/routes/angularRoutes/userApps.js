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
// getting the appropriate app view depending on the DLP(OSZP)
router.post("/", function (req, res, next) {
    appQuery(req, res);
});
function appQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        const appRightsQuery = yield connection.execute(`SELECT ar.AppName, dlp.AppRights
            FROM d_l_p_rights AS dlp
            JOIN apprights AS ar
            ON ar.Rights = dlp.AppRights
            WHERE dlp.D_L_P = ?`, [req.body.O_SZ_P]);
        appView(res);
    });
}
function appView(res) {
    res.sendFile("C:\\Users\\Testi\\Desktop\\programming\\Own\\Angular\\componentsForWebPortal\\User\\UserBackEnd\\public\\dist\\user_front\\browser\\index.html");
}
exports.default = router;
