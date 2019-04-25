const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilesSchema = new Schema({
    // TODO: write the schema
  pseudo: { type: String},
  password: {type: String},//REGEX à voir
  email: {type:String},
  status: {type: String, enum:["user","admin"], default:"user"},//☀️Vérifier qu'on peut bien mettre 2 possibilités
  // fav: Array,

    // favorites: [id of articles],
      // picture: {type: Image, default: "trouveruneimagepardéfaut"},
});


const Profiles = mongoose.model('profiles', profilesSchema);
module.exports = Profiles;


