import axios from "axios";

export default {
  getArticles: function(state) {
    let {searchTerm, startYear, endYear} = state;
    return axios.post("/api/nyt", {
      q: searchTerm,
      startYear: startYear,
      endYear: endYear
    })
  }
}
