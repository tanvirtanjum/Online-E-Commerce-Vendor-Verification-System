const downloadsController = require("../controllers/downloads.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("", downloadsController.downloadFile);

module.exports = router;