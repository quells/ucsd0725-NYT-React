const router = require("express").Router();

const NYT = require("./nyt");

router.post("/nyt", (req, res) => {
  NYT.search(req.body)
    .then(results => res.json(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

module.exports = router;
