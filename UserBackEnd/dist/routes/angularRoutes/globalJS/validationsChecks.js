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
const promise_1 = require("mysql2/promise");
class FrontValid {
    constructor() {
        this._connection = (0, promise_1.createPool)({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    // Check user if exists
    userThere(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this._connection.execute(`SELECT Username FROM users WHERE EXISTS (SELECT Username FROM users WHERE Username = ?)`, [username]);
            // console.log(exists);
            return exists[0].length === 0 ? true : false;
        });
    }
    // Check if password is the users password
    passwordCheck(password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.userThere(username))) {
                const pass = yield this._connection
                    .execute(`SELECT users.Password FROM users WHERE users.Password = ? AND users.Username = ?`, [password, username])
                    .then((resolved) => {
                    if (resolved[0].length == 0) {
                        console.log(resolved[0]);
                        return this.sqlErrorHandle(new Error("Password not matching for: " + username));
                    }
                    else {
                        console.log(resolved[0]);
                        this._connection.end();
                        return "OK";
                    }
                });
                // function normal return
                return pass;
            }
            else {
                return this.sqlErrorHandle(new Error("This user does not exist "));
            }
        });
    }
    // All possible user information and constraints
    UserValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const userValid = [];
            const validationUsers = yield this._connection
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
            const allPosszibleOSZP = yield this._connection
                .execute(`SELECT 	COUNT(D_L_P_ID) as NumberOfDLPs
    FROM dep_lev_poz as dlp`);
            return allPosszibleOSZP[0][0];
        });
    }
    // Password validation options
    PasswordValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const validationPassword = yield this._connection.execute(`SELECT * FROM passwordrules`);
            return validationPassword[0][0];
        });
    }
    // Some sqlErrorHandling
    sqlErrorHandle(err) {
        // This is used to handle certain sql errors. Minimum checks, uniqueness and existense
        // Minimum length check is on the dbs-side
        this._connection.end();
        console.log("here" + err.message);
        if (err.errno == 3819) {
            let indexLast = err.sqlMessage.lastIndexOf("_");
            let indexFirst = err.sqlMessage.indexOf("_");
            let errorMessage = `Minimum Character Length of ${err.sqlMessage.substring(indexFirst + 1, indexLast)} is ${err.sqlMessage.substring(indexFirst - 1, indexFirst)}`;
            return Promise.reject(errorMessage);
        }
        else if (err.code == "ER_DUP_ENTRY") {
            return Promise.reject(err.sqlMessage);
        }
        else if ("message" in err) {
            return Promise.reject(err.message);
        }
        else
            return Promise.reject(err);
    }
}
exports.default = FrontValid;
