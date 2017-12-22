const assert = require("assert");
const request = require("request");

const api_key = process.env.NYT_API_KEY;
assert(api_key !== undefined, "NYT_API_KEY environment variable not set, cannot connect to NYT API");

const base_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

function buildQuery(q) {
  let query = {
    url: base_url,
    qs: {
      "api-key": api_key
    }
  };

  for (var key in q) {
    var value = q[key];
    switch (key) {
      case "q":
        query.qs.q = value;
        break;
      case "startYear":
        // New Year's Day
        query.qs.begin_date = `${value}0101`;
        break;
      case "endYear":
        // New Year's Eve
        query.qs.end_date = `${value}1231`;
        break;
      case "oldestFirst":
        // Default is newest first
        query.qs.sort = (value === "true") ? "oldest" : "newest";
        break;
      default: break;
    }
  }

  return query;
}

module.exports = {
  search: function(q) {
    let query = buildQuery(q);
    return new Promise((resolve, reject) => {
      request.get(query, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode !== 200) return reject(res);
        resolve(body);
      })
    })
    .then(body => {
      body = JSON.parse(body);
      let results = body.response.docs
        .filter(r => r.document_type === "article")
        .map(r => {
          let img_url = null;
          if (r.multimedia.length > 0) img_url = r.multimedia[0].url;
          if (img_url !== null) img_url = "http://nytimes.com/" + img_url;

          let author = null;
          if (r.byline != undefined && r.byline.original != undefined) author = r.byline.original;

          let result = {
            url: r.web_url || null,
            headline: r.headline.main || "MISSING_HEADLINE",
            snippet: r.snippet || null,
            published: r.pub_date || null,
            author: author,
            image: img_url
          };
          return result;
        })
      return results;
    })
  }
}
