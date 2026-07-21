const express = require("express");
const router = express.Router();


const {
    buyStock,
    sellStock,
    getBalance,
    getBought,
    getHistory,
} = require("../controllers/stock");

router.route("/buystock").post(buyStock);
router.route("/sellstock").post(sellStock);

router.route("/getBalance").get(getBalance);
router.route("/getBought").get(getBought);
router.route("/getHistory").get(getHistory);

module.exports = router;
