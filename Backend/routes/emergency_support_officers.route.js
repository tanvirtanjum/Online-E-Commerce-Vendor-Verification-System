const controller = require("../controllers/emergency_support_officers.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-officers", controller.getAll);
router.get("/get-officer/login_id/:id", auth.authSupport_Police, controller.getUserByLoginID);

module.exports = router;