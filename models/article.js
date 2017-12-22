const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  url: {type: String, index: {unique: true}},
  headline: String,
  snippet: String,
  published: Date,
  author: String,
  image: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  dateCollected: {type: Date, default: Date.now}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
