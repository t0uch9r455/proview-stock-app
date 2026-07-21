const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
    uid: {
        type: String,
    },

    balance: {
        type: Number,
    },

    stocks: {
        type: Array,
    },

    history: {
        type: Array,
    },
});

const Trade = mongoose.model("Trade", TradeSchema);
module.exports = { Trade };
