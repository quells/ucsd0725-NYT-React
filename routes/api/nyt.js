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
        query.qs.end_date = `${value}1231`
      default: break;
    }
  }

  console.log(query)

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
  }
}
