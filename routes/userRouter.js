// ---------------------------------------- LAST TRY ----------------------------------------------

const express = require("express");
const router = new express.Router();
const Profiles = require("./../models/profiles");


// router.get('/log-in', (req, res, next) => {
//   res.render("log-in");
// });


router.post("/log-in", (req,res,next) => {
  const {pseudo, password, email} = req.body;
  // const newProfiles = new Profiles ({ pseudo, password, email});
  Profiles.create({ pseudo, password, email})
//dans then "profile", tu mets ce que tu veux
  .then((profile) => {
    res.redirect("/profile");
    console.log("wesh new profile created", profile);
}) 
  .catch((error) => {
    console.log(error, "this an error");
});
})


Article.find().populate("author")


module.exports = router;

//test de retour commit 
