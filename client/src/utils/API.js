import axios from "axios";

export default {
  getArticles: function(state) {
    let {searchTerm, startYear, endYear} = state;
    return axios.get("/api/nyt", {
      params: {
        q: searchTerm,
        startYear: startYear,
        endYear: endYear
      }
    })
  },
  saveArticle: function(article) {
    return axios.post("/api/save", article)
  }
}
