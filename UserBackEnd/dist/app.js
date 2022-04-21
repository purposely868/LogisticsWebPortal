"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors_1 = __importDefault(require("cors"));
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
app.use((0, cors_1.default)()); // for testing purposes in development.
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); // getting form data mainly
app.use(cookieParser());
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
