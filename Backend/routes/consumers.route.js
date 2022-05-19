const controller = require("../controllers/consumers.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all", controller.getAll);

module.exports = router;