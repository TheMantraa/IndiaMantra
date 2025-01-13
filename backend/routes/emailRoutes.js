const express = require("express");
const router = express.Router();
const emailController = require("../controller/emailController");

router.post("/contactus", emailController.contactUs);
router.post("/save-email", emailController.saveEmail);
router.get("/download-emails", emailController.downloadEmails);

module.exports = router;
