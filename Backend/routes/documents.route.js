const controller = require("../controllers/documents.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/verification_uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })

const upload = multer({ storage: storage });

var express = require("express");

var router = express.Router();

router.get("/get-all", auth.authSupport_Police_Vendor, controller.getAll);
router.get("/get-document/:id", auth.authSupport_Police_Vendor, controller.getFileByID);
router.get("/get-all/business/:id", auth.authSupport_Police_Vendor, controller.getAllByBusinessID);
router.post("/insert-document/business/:id", auth.authVendor, upload.single('uploaded_file'), controller.insertDocument);
router.delete("/delete-document/id/:id", auth.authSupport_Police_Vendor, controller.deleteDocument);

module.exports = router;