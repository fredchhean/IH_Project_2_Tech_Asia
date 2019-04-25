const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema(
  {
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

    comments: [
      {
        text: String,
        writer: {
          type: Schema.Types.ObjectId,
          ref: "profiles"
        },
        posted: { type: Date, default: Date.now }
      }
    ],
    // date: { type: Date, required: true },
    rate: Number
  },
  { timestamps: true }
);

const Articles = mongoose.model("articles", articlesSchema);
module.exports = Articles;
