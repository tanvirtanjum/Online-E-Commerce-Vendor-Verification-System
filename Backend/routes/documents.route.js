const controller = require("../controllers/documents.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all", controller.getAll);
router.get("/get-all/business/:id", auth.authSupport_Police_Vendor, controller.getAllByBusinessID);

module.exports = router;