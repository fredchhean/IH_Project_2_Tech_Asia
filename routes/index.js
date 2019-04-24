const express = require("express");
const router = express.Router();
const Profile = require("../models/profiles.js");

// ----------Constantes to declare to use the api_articles------
const Articles = require("../models/articles");
const getAll = () => Articles.find();

/* GET home page */
router.get("/", (req, res, next) => {
  getAll()
    .then(dbRes => {
      console.log(dbRes);
      res.render("home", { ArticlesList: dbRes });
    })
    .catch(dbErr => console.log(dbErr, "je n'aime pas ça"));
});

/* GET news page */
router.get("/news", (req, res, next) => {
  res.render("news.hbs");
});

/* GET stories page */
router.get("/stories", (req, res, next) => {
  res.render("stories.hbs");
});

/* GET stories page */
router.get("/big-players", (req, res, next) => {
  res.render("big-players.hbs");
});

router.get("/discover", (req, res, next) => {
  res.render("discover.hbs");
});

router.get("/register", (req, res, next) => {
  res.render("register.hbs", { action: "/register" });
});

router.get("/profile", (req, res, next) => {
  res.render("profile.hbs");
});

router.get("/profile-edit/:id", (req, res, next) => {
  res.render("register.hbs", { action: "/profile-edit/" + req.params.id });
});

module.exports = router;
