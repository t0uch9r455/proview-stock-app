const express = require("express");
const router = express.Router();

const {
    login,
    register,
    user_list,
    logout,
    profile,

    reset_password,

    find_friends,
    find_friend_in,
    find_friend_out,
    search_friend,

    add_to_personal_watchlist,
    delete_from_personal_watchlist,
    get_watchlist,

    add_friends,
    accept_friend,
    reject_friend,

    getUserInfo,
    changeUserInfo,
    resetAccount,
    self_reset_password,
} = require("../controllers/auth");

// sprint 1 apis
router.route("/").get(user_list);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(profile);
router.route("/findf").post(find_friends);
router.route("/findfin").post(find_friend_in);
router.route("/findfout").post(find_friend_out);
router.route("/searchf").post(search_friend);

router.route("/addWatchList").post(add_to_personal_watchlist);
router.route("/deleteWatchList").post(delete_from_personal_watchlist);
router.route("/getWatchList").get(get_watchlist);

router.route("/addf").post(add_friends);
router.route("/acceptf").post(accept_friend);
router.route("/rejectf").post(reject_friend);

// sprint 2 apis
router.route("/reset").post(reset_password);

router.route("/getUserInfo").get(getUserInfo);
router.route("/changeUserInfo").post(changeUserInfo);

router.route("/resetAccount").get(resetAccount);
router.route("/selfReset").post(self_reset_password);

module.exports = router;
