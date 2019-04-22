// ---------------------------------------- LAST TRY ----------------------------------------------

const express = require("express");
const router = new express.Router();
const Profiles = require("./../models/profiles");

// CREATE USER in log-in.hbs
router.post("/register", (req, res, next) => {
  const { pseudo, password, email } = req.body;
  // const newProfiles = new Profiles ({ pseudo, password, email});
  Profiles.create({ pseudo, password, email })
    //dans then "profile", tu mets ce que tu veux
    .then(profile => {
      res.redirect("/profile");
      console.log("wesh new profile created", profile);
    })
    .catch(error => {
      console.log(error, "this an error");
    });
});

//READ USER PROFILE IN profile.hbs
router.get("/profile", (req, res) => {
  console.log("ici");

  // Profiles.findOne({ pseudo })
  //   .then(profile => {
  //     res.render({ pseudo, password, email });
  //     console.log("this is your profile");
  //   })
  //   .catch(error => {
  //     console.log("user not found");
  //   });
});

// Article.find().populate("author") made by Guillaume to reference an author of articles in profiles.js

module.exports = router;

//test de retour commit
