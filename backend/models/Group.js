const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
    },
    name: {
        type: String,
        required: [true, "Need Group Name"],
    },
    members: {
        type: Array,
        required: [true, "Need a Member"],
    },

    msgList: {
        type: Array,
    },
});

const newId = () => mongoose.Types.ObjectId();

const Group = mongoose.model("Group", GroupSchema);
module.exports = { Group, newId };
