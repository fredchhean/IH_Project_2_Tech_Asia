require("dotenv").config();
require("./utils/hbs_helpers");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

//------SERVER JS APP.USE CHECLOGING STATUS FUNCTION CHECKLOGIN STATUS (APP.USE SESSION)

// ==> login
const session = require("express-session"); //sessions make data persist between http calls
const sessionStore = new session.MemoryStore(); // mandatory for flashMessage
const passport = require("passport");
const flash = require("connect-flash");



// CUSTOM MIDDLEWARE (must be placed before app.routers)
// check if user is logged in... used for display purposes in hbs templates
function checkloginStatus(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();//{{isLoggedIn}} in .Hbs
  res.locals.user = req.user;//{{user}} in .hbs
  next();
}

/* setup session for login AND flashMessages after page redirection */
app.use(
  session({
    cookie: { maxAge: 1800000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: "mySüperS3cr3tSh0uüÜlB3H4rd2Cr@@@ck|"
  })
);

// CUSTOM MIDDLEWARE (must be placed before app.routers)
// flashMessageCatcher -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function flashMessageCatcher(req, res, next) { // check presence of flash message in request
  res.locals.flashMessage = req.session.flashMessage;// make it available in the response,
  delete req.session.flashMessage; // then delete it from session
  next();
});

app.use(passport.initialize()); // init passport lib
app.use(passport.session()); // connect passport to session system
app.use(checkloginStatus); // check user connection at each server request
app.use(flash()); // setup flash message for passport
// ==> login

// -------------- Permit to link the partials to our views ------------
hbs.registerPartials(__dirname + "/views/partials");

// -------------- Connexion to mongoose - Connect to local host - Connect(or create) the DB "project-2-Tech-Asia --
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// -------------- Import of the model Profiles from './models/Profiles --------------

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const userProfileRoute = require("./routes/userRouter.js");
app.use("/", userProfileRoute);

const articles = require("./routes/api_articles");
app.use("/", articles);

const authRoute = require("./routes/router_auth");
app.use("/", authRoute);

module.exports = app;
