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
  }
}
