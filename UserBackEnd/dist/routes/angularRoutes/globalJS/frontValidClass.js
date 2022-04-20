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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontValid = void 0;
const promise_1 = require("mysql2/promise");
class FrontValid {
    constructor() {
        this.connection = (0, promise_1.createPool)({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
    }
    UserValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const validationUsers = yield this.connection.execute(`SHOW COLUMNS FROM users`);
            const userValid = [];
            for (const iterator of validationUsers[0]) {
                userValid.push({
                    field: iterator.Field,
                    type: iterator.Type,
                    null: iterator.Null,
                });
            }
            return userValid;
        });
    }
    AllOszps() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosszibleOSZP = yield this.connection
                .execute(`SELECT 	COUNT(D_L_P_ID) as NumberOfDLPs
    FROM dep_lev_poz as dlp`);
            return allPosszibleOSZP[0][0];
        });
    }
    PasswordValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const validationPassword = yield this.connection.execute(`SELECT * FROM passwordrules`);
            return validationPassword[0][0];
        });
    }
}
exports.FrontValid = FrontValid;
