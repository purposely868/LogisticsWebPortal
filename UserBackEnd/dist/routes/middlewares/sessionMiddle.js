"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const MySQLStore = require("express-mysql-session")(express_session_1.default);
const promise_1 = __importDefault(require("mysql2/promise"));
const connection = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    database: `users`,
    password: "1asxqklp546",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
function ses() {
    return (0, express_session_1.default)({
        secret: "sercret",
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore({}, connection),
        cookie: { secure: false, maxAge: 3600 },
    });
}
console.log(connection);
exports.default = ses;
