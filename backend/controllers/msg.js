const { Message } = require("../models/Message");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const getMsg = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { email } = req.body;
        if (!id || !email) {
            const msgs = [];
            return res.send(JSON.stringify({ msgs }));
        }
        const friend_user = await User.findOne({ email });
        if (!friend_user) return res.status(400).send("No such user");
        const frdId = friend_user._id.toString();

        //TODO get msg from db
        const msgs = await Message.findOne({ myId: id, frdId: frdId });
        if (!msgs) {
            return res.status(200).send(JSON.stringify({ msgs: [] }));
        }
        // const msgs = [
        //     { isMe: true, msg: "This is message #1" },
        //     { isMe: false, msg: "This is message #2" },
        // ];
        return res.status(200).send(JSON.stringify({ msgs: msgs.msgList }));
    } catch (error) {
        console.log(error);
        const msgs = [];
        res.send(JSON.stringify({ msgs }));
    }
};

const sendMsg = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { email, message } = req.body;
        if (!id || !email || !message) {
            return res.status(400).send("Please provide correct Information");
        }
        const friend_user = await User.findOne({ email });
        if (!friend_user) return res.status(400).send("No such user");
        const frdId = friend_user._id.toString();
        //TODO store to db

        const msgs = await Message.findOne({ myId: id, frdId: frdId });

        if (!msgs) {
            const msg1 = await Message.create({
                myId: id,
                frdId: frdId,
                msgList: [{ message, isMe: true }],
            });
            const msg2 = await Message.create({
                myId: frdId,
                frdId: id,
                msgList: [{ message, isMe: false }],
            });
        } else {
            Message.findOneAndUpdate(
                { myId: id, frdId: frdId },
                { $push: { msgList: { message, isMe: true } } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                }
            );
            Message.findOneAndUpdate(
                { myId: frdId, frdId: id },
                { $push: { msgList: { message, isMe: false } } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                }
            );
        }
        console.log(`Said ${message} to :${email}`);
    } catch (error) {
        console.log(error);
        const message = [];
        res.status(400);
    }
};

module.exports = {
    getMsg,
    sendMsg,
};
