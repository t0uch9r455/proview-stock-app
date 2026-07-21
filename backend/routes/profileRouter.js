const express = require("express");
const router = express.Router();

const { updateAvatar, getAvatar } = require("../controllers/profile");

router.route("/updateAvatar").post(updateAvatar);
router.route("/getAvatar").get(getAvatar);

module.exports = router;
