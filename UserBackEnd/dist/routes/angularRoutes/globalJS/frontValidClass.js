"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const promise_1 = __importStar(require("mysql2/promise"));
class FrontValid {
    constructor() {
        this.connection = (0, promise_1.createPool)({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
    }
    // Check user if exists
    userThere(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.connection.execute(`SELECT Username FROM users WHERE EXISTS (SELECT Username FROM users WHERE Username = ?)`, [username]);
            // console.log(exists);
            return exists[0].length === 0 ? true : false;
        });
    }
    // Check if password is the users password
    passwordCheck(password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield promise_1.default.createConnection({
                host: "localhost",
                user: "root",
                database: "users",
                password: "1asxqklp546",
            });
            const passResult = yield connection.execute(`SELECT users.Password FROM users WHERE users.Password = ? AND users.Username = ?`, [password, username]);
            if (passResult[0].length == 0) {
                return Promise.reject({
                    message: "Password not matching for: " + username,
                });
            }
            else {
                console.log(passResult[0]);
                connection.end();
                return Promise.resolve();
            }
        });
    }
    // All possible user information and constraints
    UserValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const userValid = [];
            const validationUsers = yield this.connection
                .execute(`SHOW COLUMNS FROM users`)
                .then((resolve) => {
                for (const iterator of resolve[0]) {
                    userValid.push({
                        field: iterator.Field,
                        type: iterator.Type,
                        null: iterator.Null,
                    });
                }
                return userValid;
            });
            return validationUsers;
        });
    }
    // All possible OSZP's
    AllOszps() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosszibleOSZP = yield this.connection
                .execute(`SELECT 	COUNT(D_L_P_ID) as NumberOfDLPs
    FROM dep_lev_poz as dlp`);
            return allPosszibleOSZP[0][0];
        });
    }
    // Password validation options
    PasswordValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const validationPassword = yield this.connection.execute(`SELECT * FROM passwordrules`);
            return validationPassword[0][0];
        });
    }
    // Some sqlErrorHandling
    sqlErrorHandle(err) {
        // This is used to handle certain sql errors. Minimum checks, uniqueness and existense
        // Minimum length check is on the dbs-side
        this.connection.end();
        if (err.errno == 3819) {
            let indexLast = err.sqlMessage.lastIndexOf("_");
            let indexFirst = err.sqlMessage.indexOf("_");
            let errorMessage = `Minimum Character Length of ${err.sqlMessage.substring(indexFirst + 1, indexLast)} is ${err.sqlMessage.substring(indexFirst - 1, indexFirst)}`;
            return errorMessage;
        }
        else if (err.code == "ER_DUP_ENTRY") {
            return err.sqlMessage;
        }
        else if ("message" in err) {
            return err.message;
        }
        else
            return err;
    }
}
exports.default = FrontValid;
