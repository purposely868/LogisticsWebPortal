"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
// This as i saw, i guess is an extended version of session. First it gets the MySQLStore function puts the session class from above than makes something new.
const MySQLStore = require("express-mysql-session")(express_session_1.default);
class BaseSQLCookiesAndSession {
    constructor(dbName, req) {
        this._usersSession = req;
        // session store options. Mainly to setup the session table.
        const options = {
            createDatabaseTable: false,
            schema: {
                tableName: "session",
                columnNames: {
                    session_id: "user_session_id",
                    expires: "user_expires",
                    data: "cookie_details",
                },
            },
        };
        // creating the session store
        this._sessionStore = new MySQLStore({ createDatabaseTable: true });
        // creating the sessions with the stores
        // i have to close the store
        //this._sessionStore.close();
    }
    // check if session is in storage
    CheckExistingSession() {
        if (!this._usersSession.id) {
            this.CreateNewUserSession();
        }
        else {
            this._sessionStore.get(this._usersSession.id, (error, session) => {
                // this._sessionStore.touch(session.id, this._usersSession, (err: any) => {
                console.log(session);
                // });
            });
        }
    }
    // if not in storage create a new one
    CreateNewUserSession() {
        // at the end = all the time. Thats not good
        //const id = crypto.randomBytes(13).toString("base64");
        const userID = Math.floor(Math.random() * 100).toString();
        //console.log(this._usersSession);
        this._usersSession.test = "banana";
        this._sessionStore.set(this._usersSession.id, this._usersSession, (err) => {
            console.log(err);
        });
        return userID;
    }
    // if cookie expired delete session or when logged out
    DeleteUserSession() {
        this._sessionStore.destroy(this._usersSession.id, (err) => {
            console.log(err);
        });
    }
}
exports.default = BaseSQLCookiesAndSession;
