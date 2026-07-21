const { Group, newId } = require("../models/Group");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const createGroup = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);

        const { groupName } = req.body;

        if (groupName === "") return res.status(400);

        const groupId = newId();

        Group.create({
            _id: groupId,
            name: groupName,
            members: [id],
            msgList: [],
        });

        User.findByIdAndUpdate(
            id,
            { $push: { groups: groupId.toString() } },
            function (error, success) {
                // if (error) {
                //     console.log(error);
                // } else {
                //     console.log(success);
                // }
            }
        );
        res.status(200);
    } catch (error) {
        console.log(error);
        res.send("createGroup failed");
    }
};

const getMyGroups = async (req, res) => {
    try {
        // console.log("getting my groups");
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            return res.status(400).send("No auth");
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("No such user");
        }
        var groups = user.groups;
        let myGroups = [];

        for (let i = 0; i < groups.length; i++) {
            var temp = await Group.findById(groups[i]);
            // console.log(temp);
            myGroups.push({ name: temp.name, id: temp._id.toString() });
        }
        // console.log(myGroups);
        res.status(200).send(JSON.stringify({ myGroups }));
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ myGroups: [] }));
    }
};

const addMember = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);

        const { groupId } = req.body;
        if (!id || !groupId) {
            return res.status(400).send("Need information");
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send("No such group");
        }
        var members = group.members;
        console.log(members);
        if (members.includes(id)) {
            console.log("already in group");
            return res.status(200);
        }
        Group.findByIdAndUpdate(
            groupId,
            { $push: { members: id } },
            function (error, success) {
                // if (error) {
                //     console.log(error);
                // } else {
                //     console.log(success);
                // }
            }
        );
        User.findByIdAndUpdate(
            id,
            { $push: { groups: groupId } },
            function (error, success) {
                // if (error) {
                //     console.log(error);
                // } else {
                //     console.log(success);
                // }
            }
        );
        console.log(`Added ${id} To ${groupId}`);
        res.status(200);
    } catch (error) {
        console.log(error);
        res.send("addmember failed");
    }
};

const getMember = async (req, res) => {
    try {
        const { groupId } = req.body;
        if (!groupId) {
            res.status(400).send("Please provide groupId");
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send("No such group");
        }

        const groupList = group.members;
        let members = [];
        for (let i = 0; i < groupList.length; i++) {
            var temp = await User.findById(groupList[i]);
            // console.log(temp);
            result.push(temp.name);
        }

        res.send(JSON.stringify({ members }));
    } catch (error) {
        console.log(error);
        const members = [];
        res.send(JSON.stringify({ members }));
    }
};

const getGroupMsg = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { groupId } = req.body;
        if (!id || !groupId) {
            const msgs = [];
            return res.send(JSON.stringify({ msgs }));
        }
        const group = await Group.findById(groupId);
        if (!group) {
            const msgs = [];
            return res.send(JSON.stringify({ msgs }));
        }
        // get msg from db
        const msgList = group.msgList;
        let msgs = [];
        for (let i = 0; i < msgList.length; i++) {
            var temp = msgList[i];
            // console.log(temp);
            var user = await User.findById(temp.uid);
            var username = user.name;
            var email = user.email;
            msgs.push({
                message: temp.message,
                username: username,
                email: email,
                isMe: temp.uid === id,
            });
        }

        return res.status(200).send(JSON.stringify({ msgs: msgs }));
    } catch (error) {
        console.log(error);
        const msgs = [];
        res.send(JSON.stringify({ msgs }));
    }
};

const sendGroupMsg = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { groupId, message } = req.body;
        if (!id || !groupId || !message) {
            return res.status(400).send("Please provide correct Information");
        }

        //TODO store to db

        const group = await Group.findById(groupId);

        if (!group) {
            res.status(404);
            return;
        } else {
            Group.findByIdAndUpdate(
                groupId,
                { $push: { msgList: { message, uid: id } } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                }
            );
        }
        console.log(`Said ${message} to :${groupId}`);
        res.status(200);
    } catch (error) {
        console.log(error);
        const message = [];
        res.status(400);
    }
};

const findGroup = async (req, res) => {
    try {
        const { groupName } = req.body;
        if (!groupName) {
            res.status(400).send("Need Group Name");
        }
        let result = [];
        for await (const doc of Group.find({ name: groupName })) {
            result.push({ id: doc._id.toString(), name: doc.name });
        }
        console.log(result);
        res.status(200).send(JSON.stringify({ result }));
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

const getGroupName = async (req, res) => {
    try {
        const { groupId } = req.body;
        if (!groupId) {
            res.status(400).send("Need Group Name");
        }
        console.log(groupId);
        const group = await Group.findById(groupId);
        console.log(group);
        res.status(200).send(JSON.stringify({ name: group.name }));
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

module.exports = {
    createGroup,
    getMyGroups,
    addMember,
    getMember,
    getGroupMsg,
    sendGroupMsg,
    findGroup,
    getGroupName,
};
