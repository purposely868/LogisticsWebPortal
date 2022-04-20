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
// This is for the user management app.
// Routes
router.get("/frontvalidation", (req, res, next) => { });
router.post("/register", (req, res, next) => {
    userRegister(req, res);
});
router.put("/information", (req, res, next) => {
    userInformation(req.body.d_l_p, req.body.username);
});
router.put("/update", (req, res, next) => {
    userUpdate(req, res);
    res.status;
});
router.delete("/delete", (req, res) => {
    userDelete(req, res);
});
router.get("/alloszp", (req, res) => {
    informations(res, "alloszp");
});
router.get("/alluser", (req, res) => {
    informations(res, "alluser");
});
router.get("/allappsrigths", (req, res) => {
    informations(res, "appsrigths");
});
// Function Definitions:
// O_SZ_P and apps and rights Information after reg and up the user
function userInformation(d_l_p, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        //This gets requested after submitting the registration and updateing a user and if every thing went ok.
        // needs Username + OSZP
        // IMPORTAN: i have to wait for the connection to establis because
        // .execute can only work if the connection is ready. It is not like .then
        const returnInfo = {
            DepartmentName: "",
            PozLevel: 0,
            PozitionName: "",
            PozitionDiscription: "",
            AppName: "",
            Rights: [],
            AllInfo: [],
        };
        const queryResult = yield connection
            .execute(`SELECT dlp.DepartmentName, dlp.PozLevel, dlp.PozitionName, dlp.PozitionDiscription, ar.AppName, ar.Rights
  FROM dep_lev_poz as dlp
  JOIN d_l_p_rights as dlpr
  ON dlp.D_L_P_ID = dlpr.D_L_P
  JOIN apprights as ar
  ON dlpr.AppRights = ar.Rights
  WHERE dlp.D_L_P_ID = ?`, [d_l_p])
            .then((resolve) => {
            for (let i = 0; i < resolve[0].length; i++) {
                const element = resolve[0][i];
                if (i == 0) {
                    for (const key in element) {
                        if (key != "Rights")
                            returnInfo[key] = element[key];
                    }
                }
                returnInfo.Rights.push(element.Rights);
            }
            return connection.execute(`SELECT * FROM users WHERE Username = ?`, [
                username,
            ]);
        })
            .then((resolve) => {
            returnInfo.AllInfo = resolve[0];
            return returnInfo;
        });
        return queryResult;
    });
}
// Some Validation Info for front end ===========
// async function frontValidation(req, res, next) {
//   // Sends validation info so it can be more automatic and because all the validation is done front end
//   // All posszible OSZP, Field type, max characters or value, not null
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "users",
//     password: "1asxqklp546",
//   });
//   const frontValidation = { userValid: [], oszpValid: 0, passwordValid: {} };
//   const validationUsers = await connection.execute(`SHOW COLUMNS FROM users`);
//   const allPosszibleOSZP =
//     await connection.execute(`SELECT 	COUNT(D_L_P_ID) as NumberOfDLPs
//   FROM dep_lev_poz as dlp`);
//   const validationPassword = await connection.execute(
//     `SELECT * FROM passwordrules`
//   );
//   for (const iterator of validationUsers[0]) {
//     frontValidation.userValid.push({
//       field: iterator.Field,
//       type: iterator.Type,
//       null: iterator.Null,
//     });
//   }
//   frontValidation.oszpValid = allPosszibleOSZP[0][0];
//   frontValidation.passwordValid = validationPassword[0][0];
//   //console.log(frontValidation);
//   res.json(frontValidation);
// }
// REGISTER =================
function userRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        connection
            .execute(`INSERT INTO
     users(Username, FirstN, LastN, Email, Phone, D_L_P,   Password)
     VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
            req.body.Username,
            req.body.FirstN,
            req.body.LastN,
            req.body.Email,
            req.body.Phone,
            req.body.D_L_P,
            req.body.Password,
        ])
            .then((resolve) => {
            return userInformation(req.body.D_L_P, req.body.Username);
        })
            .then((resolve) => {
            res.sendStatus(201);
            res.json(resolve);
        })
            .catch((err) => {
            res.send(sqlErrorHandle(err));
        });
    });
}
// UPDATE =================
function userUpdate(req, res) {
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "users",
        password: "1asxqklp546",
    });
    let queryUpdate = "UPDATE users SET";
    let updateValues = [];
    let reqKeys = Object.keys(req.body);
    for (let i = 0; i < reqKeys.length; i++) {
        // console.log(reqKeys[i]);
        if (reqKeys[i] != "Username") {
            //length min 2 username + other column
            queryUpdate += ` ${reqKeys[i]} = ?`;
            updateValues.push(req.body[reqKeys[i]]);
            if (i != reqKeys.length - 1)
                queryUpdate += ",";
        }
    }
    queryUpdate += ` WHERE Username = "${req.body.Username}"`;
    connection.execute(queryUpdate, updateValues, (err, results, fields) => {
        if (err) {
            res.send(sqlErrorHandle(err));
        }
        else if (results.info.indexOf("0") != 14) {
            res.status(404);
            res.send(sqlErrorHandle(new Error(`No user named ${req.body.username}`)));
        }
        else {
            res.status(201);
            res.json(results);
        }
    });
}
// DELETE =================
function userDelete(req, res) {
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "users",
        password: "1asxqklp546",
    });
    connection.execute("DELETE FROM users WHERE Username = ?", [req.body.username], (err, results, fields) => {
        if (err) {
            res.status(500);
            res.json(sqlErrorHandle(err));
        }
        else if (results.affectedRows == 0) {
            res.status(404);
            res.send(sqlErrorHandle(new Error(`No user named ${req.body.username}`)));
        }
        else {
            res.json(results);
        }
    });
}
// Send Information about apps rights and oszps
function informations(res, target) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection({
            host: "localhost",
            user: "root",
            database: "users",
            password: "1asxqklp546",
        });
        let queryResult = [];
        switch (target) {
            case "alloszp":
                queryResult = yield connection.execute(`SELECT *
      FROM dep_lev_poz`);
                break;
            case "allusers":
                queryResult = yield connection.execute(`SELECT *
      FROM users`);
                break;
            case "allappsrigths":
                queryResult = yield connection.execute(`SELECT *
      FROM appsrights`);
                break;
            default:
                break;
        }
        res.json(queryResult[0]);
    });
}
// Some sqlErrorHandling
function sqlErrorHandle(err) {
    // This is used to handle certain sql errors. Minimum checks, uniqueness and existense
    // Minimum length check is on the dbs-side
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
exports.default = router;
