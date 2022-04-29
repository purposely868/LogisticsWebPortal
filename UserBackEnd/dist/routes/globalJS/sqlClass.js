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
const validationsChecks_1 = __importDefault(require("./validationsChecks"));
const hashing_1 = __importDefault(require("./hashing"));
class sqlClass extends validationsChecks_1.default {
    constructor(dbName, req) {
        super(dbName, req);
    }
    // REGISTER =================
    userRegister(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashLogic = new hashing_1.default();
            //console.log(user);
            if (!(yield this.userThere(user.userName))) {
                //console.log("in user register");
                // First hashing the inputted password.
                const hashedPassword = yield hashLogic.passwordHash(user.password);
                // check data
                console.log(hashedPassword);
                console.log(user);
                // Then put the user in the DBS
                const userInfo = yield this._connection
                    .execute(`INSERT INTO
            users(userName, firstName, lastName, email, phone, oszp,   password)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                    user.userName,
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.phone,
                    user.oszp,
                    hashedPassword,
                ])
                    .then((resolve) => {
                    //console.log("in user reg resolved");
                    // we get the Registered users info and in here we close the connections.
                    return this.userInformation(user.userName);
                })
                    .catch((err) => {
                    return this.sqlErrorHandle(err);
                });
                // final return
                return userInfo;
            }
            else {
                return this.sqlErrorHandle(new Error("This user already exists"));
            }
        });
    }
    // UPDATE =================
    userUpdate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // create the Class for hashing here too
            const hashLogic = new hashing_1.default();
            let hashedPassword;
            let queryUpdate = "UPDATE users SET";
            let updateValues = [];
            let reqKeys = Object.keys(user);
            if (yield this.userThere(user.userName)) {
                for (let i = 0; i < reqKeys.length; i++) {
                    // console.log(reqKeys[i]);
                    if (reqKeys[i] != "userName") {
                        if (reqKeys[i] === "password") {
                            // here we have to create the hash for the password if the admin wants to create a one
                            hashedPassword = yield hashLogic.passwordHash(user.password);
                            queryUpdate += ` ${reqKeys[i]} = ?,`;
                            updateValues.push(hashedPassword);
                            continue;
                        }
                        //length min 2 username + other column
                        queryUpdate += ` ${reqKeys[i]} = ?`;
                        updateValues.push(user[reqKeys[i]]);
                        if (i != reqKeys.length - 1)
                            queryUpdate += ",";
                    }
                }
                queryUpdate += ` WHERE userName = "${user.userName}"`;
                const updateResult = yield this._connection
                    .execute(queryUpdate, updateValues)
                    .then((resolve) => {
                    console.log(resolve);
                    if ("affectedRows" in resolve[0]) {
                        if (resolve[0].affectedRows == 1) {
                            return "User Updated";
                        }
                        else {
                            return this.sqlErrorHandle(resolve[0]);
                        }
                    }
                });
                return updateResult;
            }
            else {
                return this.sqlErrorHandle(new Error("This user does not exist "));
            }
        });
    }
    // DELETE =================
    userDelete(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userThere(username)) {
                const userDelete = this._connection
                    .execute("DELETE FROM users WHERE Username = ?", [username])
                    .then((resolve) => {
                    console.log(resolve);
                    if ("affectedRows" in resolve[0]) {
                        if (resolve[0].affectedRows == 1) {
                            return "User Deleted";
                        }
                        else {
                            return this.sqlErrorHandle(resolve[0]);
                        }
                    }
                });
                return userDelete;
            }
            else {
                return this.sqlErrorHandle(new Error("This user does not exist "));
            }
        });
    }
    // O_SZ_P and apps and rights Information after reg, del, update the user
    userInformation(username) {
        return __awaiter(this, void 0, void 0, function* () {
            //This gets requested after submitting the registration and updateing a user and if every thing went ok.
            //Additionally this gets called when somebodey searches for an individual user
            // needs Username only
            console.log(username);
            // IMPORTAN: i have to wait for the connection to establis because
            // .execute can only work if the connection is ready. It is not like .then
            const returnOszpInfo = {
                DepartmentName: "",
                PozLevel: 0,
                PozitionName: "",
                PozitionDiscription: "",
                AppName: "",
                Rights: [],
            };
            const returnUserDetails = {
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                oszp: "",
            };
            // console.log(username + " " + "in userInformation");
            // query1 user Details =======
            const userDetails = yield this._connection
                .execute(`SELECT * FROM users WHERE Username = ?`, [username])
                .then((resolve) => {
                for (const key in resolve[0][0]) {
                    if (key !== "Password") {
                        returnUserDetails[key] = resolve[0][0][key];
                    }
                    //   console.log(key);
                    //   console.log(returnUserDetails[key]);
                }
                return returnUserDetails;
            });
            // query2 DLP details =======
            const dlpDetails = yield this._connection
                .execute(`SELECT dlp.DepartmentName, dlp.PozLevel, dlp.PozitionName, dlp.PozitionDiscription, ar.AppName, ar.Rights
    FROM dep_lev_poz as dlp
    JOIN d_l_p_rights as dlpr
    ON dlp.D_L_P_ID = dlpr.D_L_P
    JOIN apprights as ar
    ON dlpr.AppRights = ar.Rights
    WHERE dlp.D_L_P_ID = ?`, [returnUserDetails["oszp"]])
                .then((resolve) => {
                // végig megy az összes soron úgy, hogy figyelembe veszi azt, ha az embernek több jogosultsága van.
                for (let i = 0; i < resolve[0].length; i++) {
                    const element = resolve[0][i];
                    if (i == 0) {
                        for (const key in element) {
                            if (key != "Rights")
                                returnOszpInfo[key] = element[key];
                        }
                    }
                    returnOszpInfo.Rights.push(element.Rights);
                }
                return returnOszpInfo;
            });
            // Akkor lessz sikeres ha minden Promise Resolved.
            // Viszont egy Reject esetén is azonnal leáll és Rejectként adja vissza az egészet az első Reject értékével
            // closing the pool after password and user is checked and user info is returned.
            return Promise.all([userDetails, dlpDetails]);
        });
    }
    // Send Information about apps rights and oszps
    informations(target, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = [];
            switch (target) {
                case "alloszp":
                    queryResult = yield this._connection.execute(`SELECT *
                          FROM dep_lev_poz`);
                    break;
                case "allusers":
                    queryResult = yield this._connection.execute(`SELECT *
                          FROM users`);
                    break;
                case "allappsrigths":
                    queryResult = yield this._connection.execute(`SELECT *
                          FROM appsrights`);
                    break;
                case "userinfo":
                    if (!(yield this.userThere(username))) {
                        queryResult = yield this._connection.execute(`SELECT * FROM users WHERE Username = ?`, [username]);
                    }
                    else {
                        return this.sqlErrorHandle(new Error("This user does not exist "));
                    }
                    break;
                default:
                    return Promise.reject(new Error("Nincs Ilyen Opció"));
            }
            //console.log(queryResult);
            return queryResult[0];
        });
    }
    appInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const appInfo = {
                appName: [],
                appDescription: [],
            };
            return yield this._connection
                .execute("SELECT * FROM app")
                .then((resolve) => {
                console.log(resolve[0]);
                for (const iterator of resolve[0]) {
                    appInfo.appName.push(iterator.AppName);
                    appInfo.appDescription.push(iterator.Discription);
                }
                return appInfo;
            });
        });
    }
    poolClose() {
        this._connection.end();
    }
}
exports.default = sqlClass;
