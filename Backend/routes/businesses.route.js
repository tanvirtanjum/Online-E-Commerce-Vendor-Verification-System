const controller = require("../controllers/businesses.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all", auth.authSupport, controller.getAll);
router.get("/get-all/owner_id/:id", auth.authVendor, controller.getAllByOwner);

module.exports = router;