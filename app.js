require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

// -------------- Connexion to mongoose - Connect to local host - Connect(or create) the DB "project-2-Tech-Asia --
mongoose
  .connect('mongodb://localhost/project-2-Tech-Asia', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// -------------- Import of the model Profiles from './models/Profiles --------------
const Profiles = require('./models/profiles.js');
const Articles = require('./models/articles.js')

//Creation of a profile in mongoose ☀️Why we can't create a second user ?
Profiles.create({
  pseudo: "arnaud",
  password: "arnaud le password ",
  // status: "user",
  email: "mochearnaud@gmail.com",
  // fav: ["boobies","pussy"],
})
  .then(arg => {
    console.log("created profile!", "bonjour arnaud");
  })
  .catch(err => {
    console.error("no profile", "bonjour arnaud", err);
  });

//Creation of a article in mongoose ☀️Why we can't create a second user ?
//☀️comment faire en sorte que les paramètres de nos collections (articles, profiles...) prennent en compte les nouveaux paramètres : ex title : unique: true

// Articles.create({
//     title: "Article 4_test_unique",
//     text: "lorem ipsum",
//     prompt: "lorem ipsum",
//     tag: ["test"],
//     category: ["test"],
//     author: "lorem ipsum",
//     commment: [{
//       text: "lorem ipsum",
//       date: Date.now(),
//     }], 
//     date: Date.now(),
//     rate: 4,
// })
//   .then(arg => {
//     console.log("created articles!");
//   })
//   .catch(err => {
//     console.error("no articles created", err);
//   });



const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/userRouter.js');
console.log(auth);

app.use('/', auth);





module.exports = app;
