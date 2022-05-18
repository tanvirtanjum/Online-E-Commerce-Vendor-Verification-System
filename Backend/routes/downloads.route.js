const downloads = require("../controllers/downloads.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("", downloads.downloadFile);

module.exports = router;