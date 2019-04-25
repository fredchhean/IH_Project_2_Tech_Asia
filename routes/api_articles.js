const express = require("express");
const router = new express.Router();
const Articles = require("../models/articles");

// -- -----------🚀 FILE UPLOAD ------------- --
const fileUploader = require ("../config/cloudinaryConfig")
// -- -----------🚀 FILE UPLOAD ------------- --


// ------------------------------------------------------
// this router only deals with articles data exchange (CRUD)
// ------------------------------------------------------

// ------ THE ROUTES GET ------

router.get("/process-article", (req, res, next) => {
  res.render("process-article.hbs");
  // console.log("route created");
});



// ----------THE METHODS ---------
const create = data => Articles.create(data);

const getAll = () => Articles.find();

const getOne = id => Articles.findById(id);

const deleteOne = id => Articles.findByIdAndRemove(id);

// const updateOne = (id, data) =>
//   productModel.findOneAndUpdate({ _id: id }, { ...data });

// insert one product in database

// --------- FUNCTIONS -----------
router.post("/process-article", fileUploader.single("avatarUpload"),
(req, res) => {
  create(req.body)
    .then(dbRes =>
      res
        // .status(200)
        // .json(dbRes)
        // .send(dbRes)
        .redirect("/articles_dashboard")
    )
    .catch(dbErr => res.send(dbErr));
});

router.get("/articles_dashboard", (req, res) => {
  getAll()
    .then(dbRes => {
      res.render("articles_dashboard", { ArticlesList: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});



router.get("/articles_dashboard/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => {
      res.redirect("/articles_dashboard");
    })
    .catch(dbErr => res.send(dbErr));
});

router.get("/articlepage/:id", (req, res) => {
  getOne(req.params.id)
    .then(article => {
      console.log("tu y es", article);
      res.render("articlepage", { article });
    })
    .catch(dbErr => res.send(dbErr));
});

module.exports = router;

// + req.params.id
