const express = require("express");
const router = new express.Router();
const Profiles = require("./../models/profiles");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // bcrypt is a famous lib for data encryption
const bcryptSalt = 10; // the salt level defines the level of encryption
const routerAuth = require("connect-ensure-login");

// -- -----------🚀 FILE UPLOAD ------------- --
const fileUploader = require ("../config/cloudinaryConfig")
// -- -----------🚀 FILE UPLOAD ------------- --


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  Profiles
    .findOne({_id: id})
    .then(user => {
      cb(null, user);
    })
    .catch(err => {
      cb(err);
    });
});

//this function setup a local strategy and provides logic for login action 
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // change default username credential to email
    function(email, passwd, next) {
      Profiles
        .findOne({ email })
        .then(user => {
          // db query success
          if (user === null)
            // if user === null
            return next(null, false, { message: "Incorrect email" });
          if (!bcrypt.compareSync(passwd, user.password))
            // if provided password is not valid
            return next(null, false, {
              message: "Incorrect password"
            });
          else return next(null, user); // it's all good my friend !
        })
        .catch(dbErr => next(dbErr)); // if the db query fail...
    }
  )
);

router.get("/register", (req, res, next) => {
  res.render("auth/register.hbs", {
    action: "/register"
  });
});

// CREATE USER in register.hbs
router.post("/register", fileUploader.single("avatarUpload"), 
(req, res, next) => {
// -- -----------🚀 FILE UPLOAD ------------- --
  
  const {
    pseudo,
    password,
    email
  } = req.body;
  // -- -----------🚀 FILE UPLOAD ------------- --
const avatar = req.file.secure_url
// -- -----------🚀 FILE UPLOAD ------------- --

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

    Profiles.create({ pseudo, password: hashPass, email ,avatar})
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

  const m =  req.flash('error')[0];
  res.render("auth/login.hbs", { msg: m });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect:"/profile",
    failureRedirect:"/login",
    failureFlash:true
  })
);

router.get("/logout", (req,res) => {
  req.logout();
  res.redirect("/login")
});

module.exports = router;