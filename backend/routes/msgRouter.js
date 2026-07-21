const express = require("express");
const router = express.Router();

const { getMsg, sendMsg } = require("../controllers/msg");

router.route("/getMsg").post(getMsg);
router.route("/sendMsg").post(sendMsg);

module.exports = router;
