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
const promise_1 = __importDefault(require("mysql2/promise"));
const hashing_1 = __importDefault(require("./hashing"));
class FrontValid {
    constructor(dbName, req) {
        this._connection = promise_1.default.createPool({
            host: "localhost",
            user: "root",
            database: `${dbName}`,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    // Check user if exists
    userThere(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._connection
                .execute(`SELECT Username FROM users WHERE EXISTS (SELECT Username FROM users WHERE Username = ?)`, [username])
                .then((resolve) => {
                // console.log(resolve);
                return resolve[0].length !== 0
                    ? true
                    : false;
            });
        });
    }
    // Check if password is the users password
    passwordCheck(userInputPassword, username, requestSession) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashLogic = new hashing_1.default();
            // Important Dont change sessions before checking the credentials!
            // main logic
            if (yield this.userThere(username)) {
                const pass = yield this._connection
                    .execute(`SELECT users.Password FROM users WHERE users.Username = ?`, [
                    username,
                ])
                    .then((resolved) => {
                    // Here we take the result of the query
                    const userPassDBS = resolved[0][0]
                        .Password;
                    // Here we check for the inputted user pass to be correct or not
                    return hashLogic.passwordCheck(userInputPassword, userPassDBS);
                })
                    .then((resolvedPassword) => {
                    // if user and password okey resolve logic
                    console.log(resolvedPassword);
                    // Changeing the request session so it will save the new session in the DBS and return the necesarry cookie(s).
                    requestSession.username = username;
                    // because the hashing function returns true or false we implement this logic
                    if (resolvedPassword) {
                        return "Password Matching";
                    }
                    else {
                        return this.sqlErrorHandle(new Error("Password not matching for: " + username));
                    }
                });
                // any return.
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
            const validationUsers = this._connection
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
            const allPosszibleOSZP = yield this._connection.execute(`SELECT 	* 
    FROM dep_lev_poz as dlp`);
            return allPosszibleOSZP[0];
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
