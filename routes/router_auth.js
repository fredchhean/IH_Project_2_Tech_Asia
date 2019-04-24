const express = require("express");
const router = new express.Router();
const Profiles = require("./../models/profiles");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // bcrypt is a famous lib for data encryption
const bcryptSalt = 10; // the salt level defines the level of encryption

router.get("/register", (req, res, next) => {
  res.render("auth/register.hbs", {
    action: "/register"
  });
});

// CREATE USER in register.hbs
router.post("/register", (req, res, next) => {
  const {
    pseudo,
    password,
    email
  } = req.body;

  Profiles.findOne({
    email
  }).then(checkMail => {

    if (checkMail) {
      
      const msg = {
        txt: "This email is already registered in database",
        status: "warning"
      };

      return res.render("auth/register", {
        msg
      });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    console.log("mdp encrypt", hashPass);
    // more info : https://en.wikipedia.org/wiki/Salt_(cryptography)

    Profiles.create({ pseudo, password: hashPass, email })
      //dans then "profile", tu mets ce que tu veux
      .then(profile => {
        console.log(profile);
        req.session.flashMessage = { //this message will be access for one redirection
          txt: "Successfully registered",
          status: "success"
        };
        res.redirect("/login");
        // res.locals.profileInfo = profile
        // res.render("/profile")
        console.log("wesh new profile created", profile);
      })
      .catch(error => {
        console.log(error, "this an error");
      });

  });

});


router.get("/login", (req, res, next) => {
  console.log(res.locals.flashMessage)
  res.render("auth/login.hbs", { msg:res.locals.flashMessage } );
});



module.exports = router;