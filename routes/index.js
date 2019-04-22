const express = require('express');
const router  = express.Router();
const Profile = require('../models/profiles.js')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('home.hbs');
});

/* GET news page */
router.get('/news', (req, res, next) => {
  res.render('news.hbs');
});

/* GET stories page */
router.get('/stories', (req, res, next) => {
  res.render('stories.hbs');
});

/* GET stories page */
router.get('/big-players', (req, res, next) => {
  res.render('big-players.hbs');
});


router.get('/discover', (req, res, next) => {
  res.render('discover.hbs');
});


router.get('/log-in', (req, res, next) => {
  res.render('log-in.hbs');
});

router.get('/profile', (req, res, next) => {
  res.render('profile.hbs');
});


module.exports = router;


