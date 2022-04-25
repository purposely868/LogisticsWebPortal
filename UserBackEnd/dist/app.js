"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const promise_1 = __importDefault(require("mysql2/promise"));
var cookieParser = require("cookie-parser");
const express_session_1 = __importDefault(require("express-session"));
const MySQLStore = require("express-mysql-session")(express_session_1.default);
// Index Routes
const index_1 = __importDefault(require("./routes/indexRoutes/index"));
const general_1 = __importDefault(require("./routes/indexRoutes/general"));
const loginPage_1 = __importDefault(require("./routes/indexRoutes/loginPage"));
// Angular Routes
const login_1 = __importDefault(require("./routes/angularRoutes/login"));
const userHome_1 = __importDefault(require("./routes/angularRoutes/userHome"));
const userReg_1 = __importDefault(require("./routes/angularRoutes/userReg"));
const app = (0, express_1.default)();
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((0, cors_1.default)({ credentials: true, origin: true })); // for testing purposes in development.
//app.use(cookieParser());
const storeSQL = new MySQLStore({ clearExpired: true, checkExpirationInterval: 28800000 }, promise_1.default.createPool({
    host: "localhost",
    user: "root",
    database: `users`,
    password: "1asxqklp546",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}));
app.use((0, express_session_1.default)({
    name: "UserSession",
    secret: "sercret",
    resave: false,
    saveUninitialized: false,
    store: storeSQL,
    rolling: true,
    cookie: {
        secure: false,
        maxAge: 36000000,
        sameSite: true,
        httpOnly: false,
    },
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); // getting form data mainly
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Index Routers
app.use("/", index_1.default);
app.use("/general", general_1.default);
app.use("/loginPage", loginPage_1.default);
// Angular Routers
app.use("/login", login_1.default);
app.use("/userHome", userHome_1.default);
app.use("/userReg", userReg_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
