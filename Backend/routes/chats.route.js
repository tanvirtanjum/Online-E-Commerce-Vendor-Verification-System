const controller = require("../controllers/chats.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all/pending", auth.authSupport, controller.getAllPending);

module.exports = router;