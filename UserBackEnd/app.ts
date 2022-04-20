import createError from "http-errors";
import express from "express";
import path from "path";
const cookieParser = require("cookie-parser");
const logger = require("morgan");
import cors from "cors";

// Index Routes
import index from "./routes/indexRoutes/index";
import general from "./routes/indexRoutes/general";
import loginPage from "./routes/indexRoutes/loginPage";

// Angular Routes
import login from "./routes/angularRoutes/login";
import userHome from "./routes/angularRoutes/userHome";
import userAppsRouter from "./routes/angularRoutes/userApps";
import userRegRouter from "./routes/angularRoutes/userReg";

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
app.use(function (
  err: { message: any; status: any },
  req: { app: { get: (arg0: string) => string } },
  res: {
    locals: { message: any; error: any };
    status: (arg0: any) => void;
    render: (arg0: string) => void;
  },
  next: any
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
