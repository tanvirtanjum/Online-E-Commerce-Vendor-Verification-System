const controller = require("../controllers/logins.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all", controller.getAll);
router.post("/get-user-authentication", controller.getUser);

module.exports = router;