const express = require("express");
const router = new express.Router();
const Articles = require("./../models/articles");

// ------------------------------------------------------
// this router only deals with articles data exchange (CRUD)
// ------------------------------------------------------

// ------ THE ROUTES GET ------

router.get("/articles_dashboard", (req, res, next) => {
  res.render("articles_dashboard.hbs");
});

router.get("/process-article", (req, res, next) => {
  res.render("process-article.hbs");
  // console.log("route created");
});

// ----------THE METHODS ---------
const create = data => Articles.create(data);

// const getAll - useful ?

const getOne = id => productModel.findById(id).populate("category");

const deleteOne = id => Articles.findOneAndDelete({ _id: id });

const updateOne = (id, data) =>
  productModel.findOneAndUpdate({ _id: id }, { ...data });

// insert one product in database

// --------- FUNCTIONS -----------
router.post("/process-article", (req, res) => {
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

module.exports = router;
