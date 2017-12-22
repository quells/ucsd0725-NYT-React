const router = require("express").Router();

const NYT = require("./nyt");
const ArticleController = require("../../controllers/articleController");

router.get("/nyt", (req, res) => {
  NYT.search(req.query)
    .then(results => res.json(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

router.post("/save", (req, res) => {
  ArticleController.addArticle(req.body)
    .then(saved => {
      res.json({id: saved._id});
    })
    .catch(err => {
      if (err._id !== undefined) {
        return res.json({id: err._id});
      }
      console.error(err);
      res.sendStatus(500);
    })
});

router.get("/saved", (req, res) => {
  ArticleController.getArticles()
    .then(saved => res.json(saved))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

router.get("/saved/:id", (req, res) => {
  ArticleController.getArticle(req.params.id)
    .then(saved => res.json(saved))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.delete("/saved/:id", (req, res) => {
  ArticleController.deleteArticle(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.post("/comment", (req, res) => {
  if (req.body.articleId === undefined) return res.sendStatus(400);
  let username = (req.body.username.length > 0) ? req.body.username : "Anonymous";

  ArticleController.addComment({
    articleId: req.body.articleId,
    user: username,
    body: req.body.body
  })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.delete("/comment/:id", (req, res) => {
  ArticleController.deleteComment(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

module.exports = router;
