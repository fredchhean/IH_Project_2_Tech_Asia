const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  // picture: {type: Image, default: "trouveruneimagepardéfaut"}, ☀️Voir avec Guillaume image upload
  prompt: String,
  tag: [String],
  category: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  commment: [
    {
      text: String,
      //user: id,  //☀️commment récupérer l'id du user ?
      // picture: ☀️commment afficher l'image du user? ☀️Voir avec Guillaume image upload
      date: Date //☀️format ?
    }
  ],
  date: { type: Date, required: true },
  rate: Number
});

// const Articles = mongoose.model("articles", articlesSchema);
// module.exports = Articles;
