const path = require("path");
const router = require("express").Router();

// Serve the React app by default
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
