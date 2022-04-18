const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Index Routes
const index = require("./routes/indexRoutes/index");
const general = require("./routes/indexRoutes/general");
const loginPage = require("./routes/indexRoutes/loginPage");

// Angular Routes
const login = require("./routes/angularRoutes/login");
const userHome = require("./routes/angularRoutes/userHome");
const userAppsRouter = require("./routes/angularRoutes/userApps");
const userRegRouter = require("./routes/angularRoutes/userReg");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors()); // for testing purposes in development.

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // getting form data mainly
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Index Routers
app.use("/", index);
app.use("/general", general);
app.use("/loginPage", loginPage);

// Angular Routers
app.use("/login", login);
app.use("/userapps", userAppsRouter);
app.use("/userHome", userHome);
app.use("/userReg", userRegRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
