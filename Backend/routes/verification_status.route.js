const controller = require("../controllers/verification_status.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all", auth.authSupport, controller.getAll);

module.exports = router;