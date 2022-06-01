const controller = require("../controllers/consumers.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-consumers/registered", auth.authSupport, controller.getAllRegistered);
router.get("/get-all-consumers/unregistered", auth.authSupport, controller.getAllUnregistered);
router.get("/get-all-consumers/registered/credential/:credential", auth.authSupport, controller.getAllByCredential);
router.get("/get-consumer/login_id/:id", auth.authSupport_Police_Vendor, controller.getUserByLoginID);
router.get("/get-consumer/id/:id", auth.authSupport, controller.getUserByID);
router.post("/insert-consumer-registration", controller.postRegistration);
router.put("/update-consumer/:id", auth.authSupport, controller.updateConsumer);
router.delete("/delete-consumer/:id", auth.authSupport, controller.deleteConsumer);

module.exports = router;