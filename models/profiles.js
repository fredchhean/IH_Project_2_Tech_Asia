const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilesSchema = new Schema({
    // TODO: write the schema
  pseudo: { type: String, required:true},
  password: {type: String, required:true, unique:true},//REGEX à voir
  email: {type:String, required:true},
  status: {type: String, enum:["user","admin"], default:"user"},//☀️Vérifier qu'on peut bien mettre 2 possibilités
  // fav: Array,

    // favorites: [id of articles],
      // picture: {type: Image, default: "trouveruneimagepardéfaut"},
});


const Profiles = mongoose.model('profiles', profilesSchema);
module.exports = Profiles;


