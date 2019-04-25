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
// router.get("/news", (req, res, next) => {
//   res.render("news.hbs");
// });
router.get("/news", (req, res, next) => {
  getAll()
    .then(dbRes => {
      console.log(dbRes);
      res.render("news.hbs", { ArticlesList: dbRes });
    })
    .catch(dbErr => console.log(dbErr, "je n'aime pas ça"));
});


/* GET stories page */
// router.get("/stories", (req, res, next) => {
//   res.render("stories.hbs");
// });

router.get("/stories", (req, res, next) => {
  getAll()
    .then(dbRes => {
      console.log(dbRes);
      res.render("stories.hbs", { ArticlesList: dbRes });
    })
    .catch(dbErr => console.log(dbErr, "je n'aime pas ça"));
});

/* GET stories page */
router.get("/discover", (req, res, next) => {
  getAll()
    .then(dbRes => {
      console.log(dbRes);
      res.render("discover", { ArticlesList: dbRes });
    })
    .catch(dbErr => console.log(dbErr, "je n'aime pas ça"));
});


module.exports = router;
