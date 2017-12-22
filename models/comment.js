const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  articleId: {type: mongoose.Schema.Types.ObjectId, ref: "Article"},
  user: String,
  body: String,
  date: {type: Date, default: Date.now}
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
