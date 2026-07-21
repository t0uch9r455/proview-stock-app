const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const updateAvatar = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(401).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        console.log("here");
        const { newAvatar } = req.body;
        // console.log(req.body);
        // console.log(newAvatar);
        // console.log(newAvatar);

        User.findOneAndUpdate(
            { _id: id },
            { $set: { photo: newAvatar } },
            function (error, success) {
                if (error) {
                    // console.log(error);
                } else {
                    // console.log(success);
                }
            }
        );
        // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.status(200).send("success");
    } catch (error) {
        return res.status(500).send("error of add_photo");
    }
};

const getAvatar = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(401).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const email = req.query.email;
        console.log(email);
        // if (email != undefined) {
        //     const user_data = await User.findOne({ email });
        // } else {
        //     const user_data = await User.findById(id);
        // }

        const user_data =
            email != undefined
                ? await User.findOne({ email })
                : await User.findById(id);
        // const { newAvatar } = req.body;
        // console.log(req.body);
        // console.log(newAvatar);
        // console.log(id);

        // console.log(user_data.photo);

        return res.status(200).json({ avatar: user_data.photo });
    } catch (error) {
        return res.status(500).send("error of add_photo");
    }
};

module.exports = {
    updateAvatar,
    getAvatar,
};
