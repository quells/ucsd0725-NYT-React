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
    })
  },
  saveArticle: function(article) {
    return axios.post("/api/save", article)
  }
}
