const router = require("express").Router();

const NYT = require("./nyt");
const ArticleController = require("../../controllers/articleController");

router.post("/nyt", (req, res) => {
  NYT.search(req.body)
    .then(results => res.json(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

router.post("/save", (req, res) => {
  ArticleController.addArticle(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;
