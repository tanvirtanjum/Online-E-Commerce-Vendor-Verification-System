const controller = require("../controllers/polices.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-police", auth.authSupport_Police, controller.getAll);
router.get("/get-police/login_id/:id", auth.authSupport_Police, controller.getUserByLoginID);
router.get("/get-all-police/registered/credential/:credential", auth.authSupport, controller.getAllByCredential);
router.get("/get-police/id/:id", auth.authSupport, controller.getUserByID);
router.post("/insert-police-registration", controller.postRegistration);
router.put("/update-police/:id", controller.updatePolice);

module.exports = router;