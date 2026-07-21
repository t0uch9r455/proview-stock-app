const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    friends: {
        type: Array,
    },
    friend_out: {
        type: Array,
    },

    friend_in: {
        type: Array,
    },

    groups: {
        type: Array,
    },

    watchList: {
        type: Array,
    },

    photo: {
        type: String,
    },
    phone_number: {
        type: String,
        default: "Not Set Yet",
    },
    biology: {
        type: String,
        default: "Not Set Yet",
    },
});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
    });
};

UserSchema.methods.pswdCorrect = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
