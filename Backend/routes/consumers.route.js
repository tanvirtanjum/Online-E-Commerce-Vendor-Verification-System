const controller = require("../controllers/consumers.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-consumers", auth.authSupport_Police, controller.getAll);
router.get("/get-consumer/login_id/:id", auth.authSupport_Police, controller.getUserByLoginID);
router.post("/insert-consumer-registration", controller.postRegistration);

module.exports = router;