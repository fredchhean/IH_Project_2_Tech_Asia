const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilesSchema = new Schema({
    // TODO: write the schema
  pseudo: { type: String, required:true, unique: true },
  password: {type: String, required:true, unique: true },//REGEX à voir
  status: {type: String},
    // favorites: [id of articles],
      // picture: {type: Image, default: "trouveruneimagepardéfaut"},
});


const Profiles = mongoose.model('profiles', profilesSchema);
module.exports = Profiles;


