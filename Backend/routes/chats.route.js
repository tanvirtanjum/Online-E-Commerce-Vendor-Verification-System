const controller = require("../controllers/chats.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all/pending", auth.authSupport, controller.getAllPending);
router.get("/get-text/:id", auth.authSupport, controller.getText);
router.get("/get-all/my_chat/:id", auth.authVendor, controller.getAllMyChat);
router.post("/send-text", auth.authSupport_Police_Vendor, controller.sendText);
router.put("/mark-read/:id", auth.authSupport, controller.markRead);

module.exports = router;