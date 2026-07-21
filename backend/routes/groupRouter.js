const express = require("express");
const router = express.Router();

const {
    createGroup,
    getMyGroups,
    addMember,
    getMember,
    getGroupMsg,
    sendGroupMsg,
    findGroup,
    getGroupName,
} = require("../controllers/group");

router.route("/getGroupMsg").post(getGroupMsg);
router.route("/sendGroupMsg").post(sendGroupMsg);
router.route("/createGroup").post(createGroup);
router.route("/getMyGroups").post(getMyGroups);
router.route("/addMember").post(addMember);
router.route("/getMember").post(getMember);
router.route("/findGroup").post(findGroup);
router.route("/getGroupName").post(getGroupName);

module.exports = router;
