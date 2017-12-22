import axios from "axios";

export default {
  getArticles: function(state) {
    let {searchTerm, startYear, endYear, oldestFirst} = state;
    return axios.get("/api/nyt", {
      params: {
        q: searchTerm,
        startYear: startYear,
        endYear: endYear,
        oldestFirst: oldestFirst
      }
    });
  },
  saveArticle: function(article) {
    return axios.post("/api/save", article);
  },
  getSavedArticles: function() {
    return axios.get("/api/saved");
  },
  getSavedArticle: function(id) {
    return axios.get("/api/saved/" + id);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/saved/" + id);
  },
  addComment: function(state) {
    let {id, commentUsername, commentBody} = state;
    return axios.post("/api/comment", {
      articleId: id,
      username: commentUsername,
      body: commentBody
    });
  },
  deleteComment: function(commentId) {
    return axios.delete("/api/comment/" + commentId);
  }
}
