const controller = require("../controllers/logins.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/avatar')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

var express = require("express");

var router = express.Router();

router.get("/get-all", auth.authSupport, controller.getAll);
router.get("/get-user/id/:id", auth.authSupport_Police_Vendor, controller.getUserByID);
router.post("/get-user-authentication", controller.getUserLogin);
router.post("/get-user-authentication-password", controller.getUserPassword);
router.post("/send-user-authentication-password", controller.sendUserPassword);
router.post("/insert-consumer-registration", controller.postRegistration);
router.post("/insert-consumer", auth.authSupport, controller.postCustomer);
router.post("/insert-police", auth.authSupport, controller.postPolice);
router.put("/update-user-image/:id", auth.authSupport_Police_Vendor, upload.single('uploaded_file'), controller.updateUserImage);
router.put("/update-user-authentication-password/:id", auth.authSupport_Police_Vendor, controller.updateUserPassword);
router.put("/update-user-access/:id", auth.authSupport, controller.updateUserAccess);
router.put("/update-all-customer-access/accept", auth.authSupport, controller.acceptAllCustomer);
router.delete("/delete-user/:id", auth.authSupport, controller.deleteUser);

module.exports = router;