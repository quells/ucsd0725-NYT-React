const router = require("express").Router();

const NYT = require("./nyt");

router.post("/nyt", (req, res) => {
  NYT.search(req.body)
    .then(body => {
      body = JSON.parse(body);
      let results = body.response.docs
        .filter(r => r.document_type === "article")
        .map(r => {
          // console.log(r)
          let img_url = null;
          if (r.multimedia.length > 0) img_url = r.multimedia[0].url;
          if (img_url !== null) img_url = "http://nytimes.com/" + img_url;

          let result = {
            url: r.web_url || null,
            headline: r.headline.main || "MISSING_HEADLINE",
            snippet: r.snippet || null,
            published: r.pub_date || null,
            author: r.byline.original || null,
            image: img_url
          };
          return result;
        });
      res.json({
        results: results
      });
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

module.exports = router;
