const controller = require("../controllers/businesses.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all", auth.authSupport, controller.getAll);
router.get("/get-all/status/:status", auth.authSupport, controller.getAllByStatus);
router.get("/get-all/key/:key", auth.authSupport, controller.getAllByKey);
router.get("/get-all/owner_id/:id", auth.authVendor, controller.getAllByOwner);
router.get("/get-all/verification_officer/:id", auth.authPolice, controller.getAllByPolice);
router.get("/get-all/owner_id/:id/key/:key", auth.authVendor, controller.getAllByOwnerAndKey);
router.get("/get-all/police/:id/key/:key", auth.authPolice, controller.getAllByPoliceAndKey);
router.get("/get-business/:id", auth.authSupport_Police_Vendor, controller.getAllByID);
router.get("/get-business/credential/:credential", controller.getAllByCredential);
router.post("/insert-business", auth.authVendor, controller.postRegistration);
router.put("/reapply/:id", auth.authVendor, controller.updateApplication);
router.put("/assign/:id", auth.authSupport, controller.updateStatus);
router.put("/verify/:id", auth.authPolice, controller.updateStatusAndCount);

module.exports = router;