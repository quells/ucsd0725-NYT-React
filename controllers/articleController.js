const mongoose = require("mongoose");
const models = require("../models");
const Article = models.Article;
const Comment = models.Comment;

module.exports = {
  addArticle: function(data) {
    let article = new Article(data);
    // Check if article with that URL has already been saved
    return Article.findOne({
      url: article.url
    })
    .then((err, found) => {
      if (err != undefined) throw err;
      if (found === undefined) {
        // Save unique articles
        return article.save();
      }
      return
    })
    .catch(err => {
      // Non-Unique Key error
      if (err.code === 11000) {
        return Promise.resolve()
      }
      throw err;
    })
  },
  getArticles: function() {
    return Article.find({})
      .sort({dateCollected: -1})
      .limit(10)
  },
  getArticle: function(id) {
    return Article.findById(id).populate({path: "comments", options: {sort: {date: -1}}});
  },
  deleteArticle: function(articleId) {
    return Article.remove({_id: articleId})
  },
  addComment: function(comment) {
    return Comment.create(comment)
      .then(dbComment => Article.findById(comment.articleId).update({
        $push: {comments: dbComment._id}
      }))
  },
  deleteComment: function(commentId) {
    return Comment.remove({_id: commentId})
      .then(dbComment => Article.update({comments: commentId}, {
        $pullAll: {comments: [commentId]}
      }))
  }
}
