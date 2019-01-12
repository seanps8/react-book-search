const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const axios = require("axios");
require('dotenv').config();

// API Routes
router.use("/api", apiRoutes);

const API_KEY = process.env.API_KEY;

router.get("/search/:query", function(req, res) {
  const url = 'https://www.googleapis.com/books/v1/volumes?q='+req.params.query+'&key='+API_KEY;

  axios.get(url).then(function(response) {
    res.send(response.data.items);
  });
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;