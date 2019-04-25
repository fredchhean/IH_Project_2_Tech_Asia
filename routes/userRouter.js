const express = require("express");
const router = new express.Router();
const Profiles = require("./../models/profiles");
const ensureLogin = require("connect-ensure-login");



router.get("/profile-edit/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/register.hbs", { action: "/profile-edit/" + req.params.id });
});

// READ USER PROFILE IN profile.hbs
router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  // console.log("profil", req.user);
  res.render("profile.hbs", {profile: req.user});
});

// DELETE USER in profile.hbs
router.get("/profile-remove/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  Profiles.findByIdAndRemove(req.params.id)
    .then(profile => {
      res.locals.profileData = profile;
      res.redirect("/");
      console.log("your profile has been deleted");
    })
    .catch(err => res.send(err));
});

//UPDATE USER in profile.hbs
const updateOne = (id, data) =>
  Profiles.findOneAndUpdate({ _id: id }, { ...data });

router.post("/profile-edit/:id", (req, res) => {
  //return console.log(req.body);
  Profiles.findOneAndUpdate(
    { _id: req.params.id },
    {
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password
    }
  )
    .then(dbSuccess => {
      res.redirect("/profile/" + req.body.pseudo);
    })
    .catch(dbErr => {
      console.log("not ok", dbErr);
      res.send(dbErr);
    });
  // console.log(action);
});

// Article.find().populate("author") made by Guillaume to reference an author of articles in profiles.js

module.exports = router;

//test de retour commit

// 1st method to read with its id
// router.get("/profile/:id", (req, res) => {
// return console.log(req.params.id)
// const { id } = req.params;
// console.log("ici");

//   Profiles.findById(req.params.id)
//     .then(profile => {
//       res.locals.profileData = profile;
//       res.render("profile.hbs");
//       console.log("this is your profile");
//     })
//     .catch(error => {
//       console.log("user not found");
//     });
// });
