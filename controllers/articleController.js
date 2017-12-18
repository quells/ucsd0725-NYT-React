module.exports = {
  addArticle: function(article) {
    return new Promise((resolve, reject) => {
      console.log(article);
      resolve();
    });
  }
}
