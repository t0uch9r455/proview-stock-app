const { User } = require("../models/User");
const { Trade } = require("../models/Trade");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const user_list = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.send("No users");
    }
    res.send(users);
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            name: username,
            email: email,
            password: password,
        });
        const thisUser = await User.findOne({ email });
        var uid = thisUser._id.toString();
        Trade.create({
            uid: uid,
            stocks: [],
            balance: 100000.0,
        });
        console.log("register success");
        const token = user.createJWT();
        res.cookie("token", token, {
            maxAge: process.env.TOKEN_EXPIRY,
            httpOnly: false,
        }).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot Register!");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please provide email and password!");
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .send("This user doesn't exist. Please use another email ~");
    }
    const correctPswd = await user.pswdCorrect(password);
    if (!correctPswd) {
        return res.status(400).send("Wrong password");
    }
    console.log("login success");
    const token = user.createJWT();
    res.cookie("token", token, {
        maxAge: process.env.TOKEN_EXPIRY,
        httpOnly: false,
    }).send(user);
};

const logout = async (req, res) => {
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
        console.log("no cookie");
        // redirect to login page
        return res.send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    res.clearCookie("token");
    console.log("logout success");
    res.send(req.user);
};

const profile = async (req, res) => {
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
        // redirect to login page
        return res.status(400).send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    res.send(req.user);
};

// working, but no error handling
// need email and password to change password
// if the password is the same, don't change
const reset_password = async (req, res) => {
    const { email, original_password, password } = req.body;

    if (!email || !password || !original_password || password.length < 6) {
        return res.status(400).send("Please provide email and password!");
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .send("This user doesn't exist. Please use another email ~");
    }
    const correctPswd = await user.pswdCorrect(password);
    const verify_Pswd = await user.pswdCorrect(original_password);
    if (correctPswd) {
        return res.status(400).send("Cannot use the same password");
    }
    if (!verify_Pswd) {
        return res.status(400).send("Original Password is wrong.");
    }
    const salt = await bcrypt.genSalt(10);
    var hash_pass = await bcrypt.hash(password, salt);

    const filter = { email: `${email}` };
    const update = { password: hash_pass };
    let doc = await User.findOneAndUpdate(filter, update, {
        new: true,
    });

    const token = user.createJWT();
    res.cookie("token", token, {
        maxAge: process.env.TOKEN_EXPIRY,
        httpOnly: false,
    })
        .status(200)
        .send(user);

    console.log("end");
};

const find_friends = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        // const { id } = req.body;
        // console.log(id);
        const user_data = await User.findById(id);
        const friend_array = user_data.friends;
        const result_array = [];

        for (let i = 0; i < friend_array.length; i++) {
            var temp = await User.findById(friend_array[i]);
            // console.log(temp);
            let temp_array = [];
            temp_array.push(temp.name);
            temp_array.push(temp.email);
            result_array.push(temp_array);
            // console.log(result_array);
        }
        // console.log("123");
        // console.log(result_array);
        return res.status(200).json({ list: result_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot add friend!");
    }
};

const find_friend_in = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        // console.log(id);
        const user_data = await User.findById(id);
        // console.log(user_data);
        const friend_array = user_data.friend_in;
        const result_array = [];

        for (let i = 0; i < friend_array.length; i++) {
            var temp = await User.findById(friend_array[i]);
            // console.log(temp);
            let temp_array = [];
            temp_array.push(temp.name);
            temp_array.push(temp.email);
            result_array.push(temp_array);
            // console.log(result_array);
        }
        // console.log("123");
        // console.log(result_array);
        return res.status(200).json({ list: result_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot add friend!");
    }
};

const find_friend_out = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        // console.log(id);
        const user_data = await User.findById(id);
        // console.log(user_data);
        const friend_array = user_data.friend_out;
        const result_array = [];

        for (let i = 0; i < friend_array.length; i++) {
            var temp = await User.findById(friend_array[i]);
            // console.log(temp);
            let temp_array = [];
            temp_array.push(temp.name);
            temp_array.push(temp.email);
            result_array.push(temp_array);
            // console.log(result_array);
        }
        // console.log("123");
        // console.log(result_array);
        return res.status(200).json({ list: result_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot add friend!");
    }
};

const search_friend = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(200).send("Please provide correct Information");
        }
        const friend_user = await User.findOne({ email });
        if (!friend_user) {
            return res
                .status(200)
                .send("This user doesn't exist. Please use another email ~");
        }
        // find the email, return email and username
        // console.log(friend_user);

        const email_result = email;
        const name_result = friend_user.name;
        const result_array = [];
        result_array.push(name_result);
        result_array.push(email_result);

        // console.log(result_array);
        return res.status(200).json({ info: result_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot find friend!");
    }
};

const add_friends = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { email } = req.body;
        if (!id || !email) {
            return res.status(400).send("Please provide correct Information");
        }
        const friend_user = await User.findOne({ email });

        if (!friend_user) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }
        const my_id = await User.findById(id);
        if (!my_id) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }
        const add_id = friend_user._id.toString();
        if (
            my_id.friends.includes(add_id) ||
            my_id.friend_out.includes(add_id) ||
            my_id.friend_in.includes(add_id) ||
            add_id === id
        ) {
            return res.status(400).send("already in friend list");
        }

        User.findOneAndUpdate(
            { _id: id },
            { $push: { friend_out: add_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        User.findOneAndUpdate(
            { _id: add_id },
            { $push: { friend_in: id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        const result = await User.findOne({ id });

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.send("Cannot add friend!");
    }
};

const accept_friend = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { email } = req.body;
        if (!id || !email) {
            return res.status(400).send("Please provide correct Information");
        }
        const id_me = await User.findOne({ _id: id });
        if (!id_me) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }

        const my_id_2 = await User.findOne({ email: email });
        if (!my_id_2) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }
        const my_id = id_me._id.toString();
        const email_id = my_id_2._id.toString();

        User.findOneAndUpdate(
            { _id: my_id },
            { $push: { friends: email_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        User.findOneAndUpdate(
            { _id: email_id },
            { $push: { friends: my_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        User.findOneAndUpdate(
            { _id: my_id },
            { $pull: { friend_in: email_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        User.findOneAndUpdate(
            { _id: email_id },
            { $pull: { friend_out: my_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        const result = await User.findOne({ my_id });
        const result_2 = await User.findOne({ email_id });
        // console.log(result);
        // console.log(result_2);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.send("Cannot add friend!");
    }
};

const reject_friend = async (req, res) => {
    try {
        const { id, email } = req.body;
        if (!id || !email) {
            return res.status(400).send("Please provide correct Information");
        }
        const id_me = await User.findOne({ _id: id });
        if (!id_me) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }

        const my_id_2 = await User.findOne({ email: email });
        if (!my_id_2) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }
        const my_id = id_me._id.toString();
        const email_id = my_id_2._id.toString();

        User.findOneAndUpdate(
            { _id: my_id },
            { $pull: { friend_in: email_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        User.findOneAndUpdate(
            { _id: email_id },
            { $pull: { friend_out: my_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        const result = await User.findOne({ my_id });
        const result_2 = await User.findOne({ email_id });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.send("Cannot add friend!");
    }
};

const add_to_personal_watchlist = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { stockname } = req.body;
        console.log(1111111);
        console.log(stockname);
        console.log(req.body);

        if (!id || !stockname) {
            return res.status(400).send("Please provide correct Information");
        }

        const my_id = await User.findById(id);
        if (my_id.watchList.includes(stockname)) {
            return res.status(400).send("already in watch list");
        }

        User.findOneAndUpdate(
            { _id: id },
            { $push: { watchList: stockname } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        return res.status(200).send("add successful");
    } catch (error) {
        return res.status(400).send("can't add to watchlist");
    }
};

const get_watchlist = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        // const { id } = req.body;
        console.log(id);
        const user_data = await User.findById(id);
        const watchList_array = user_data.watchList;
        // const result_array = [];

        // for (let i = 0; i < friend_array.length; i++) {
        //     var temp = await User.findById(friend_array[i]);
        //     console.log(temp);
        //     let temp_array = [];
        //     temp_array.push(temp.name);
        //     temp_array.push(temp.email);
        //     result_array.push(temp_array);
        //     console.log(result_array);aw
        // }
        // console.log("123");
        console.log(watchList_array);
        return res.status(200).json({ list: watchList_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot get watch list!");
    }
};

const delete_from_personal_watchlist = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { stockname } = req.body;
        console.log(11111111);
        console.log(req.body);
        console.log(id);
        console.log(stockname);

        //if (!id || !stockname) {
        //    return res.status(400).send("Please provide correct Information");
        //}

        //const my_id = await User.findById(id);
        //if (!my_id.watchList.includes(stockname)) {
        //    return res.status(400).send("not in watch list");
        //}

        User.findOneAndUpdate(
            { _id: id },
            { $pull: { watchList: stockname } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        return res.status(200).send("delete successful");
    } catch (error) {
        return res.status(400).send("can't delete from watchlist");
    }
};

const getUserInfo = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const user_data = await User.findById(id);
        return res.status(200).json({
            username: user_data.name,
            email: user_data.email,
            phone_number: user_data.phone_number,
            biology: user_data.biology,
        });
    } catch (error) {
        return res.status(500).send("cannot get User Info");
    }
};

const changeUserInfo = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);

        let { username, phone_number, biology } = req.body;
        console.log(req.body);
        const user_data = await User.findById(id);
        if (username === "") {
            username = user_data.name;
        }
        if (phone_number === "") {
            phone_number = user_data.phone_number;
        }
        if (biology === "") {
            biology = user_data.biology;
        }
        User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: username,
                    phone_number: phone_number,
                    biology: biology,
                },
            },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );

        return res.status(200).send("change success!");
    } catch (error) {
        return res.status(500).send("cannot get User Info");
    }
};

const resetAccount = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            res.status(400).send("No auth");
            return;
        }

        Trade.findOneAndUpdate(
            { uid: id },
            { $set: { balance: 100000 } },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );
        Trade.findOneAndUpdate(
            { uid: id },
            {
                $unset: { history: 1 },
            },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );

        Trade.findOneAndUpdate(
            { uid: id },
            {
                $unset: { stocks: 1 },
            },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );
        return res.status(200).send("reset success!");
    } catch (error) {
        return res.status(500).send("cannot get User Info");
    }
};

const self_reset_password = async (req, res) => {
    const { password } = req.body;
    if (password.length < 6) {
        return res.status(400).send("Please provide email and password!");
    }
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
        return res.status(400).send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    const user_data = await User.findById(id);

    const salt = await bcrypt.genSalt(10);
    var hash_pass = await bcrypt.hash(password, salt);

    const update = { password: hash_pass };
    await User.findOneAndUpdate({ _id: id }, update, {
        new: true,
    });
    res.status(200).send("end");

    // const token = user.createJWT();
    // res.cookie("token", token, {
    //     maxAge: process.env.TOKEN_EXPIRY,
    //     httpOnly: false,
    // })
    //     .status(200)
    //     .send(user);

    // console.log("end");
};

module.exports = {
    login,
    register,
    user_list,
    logout,
    profile,
    find_friends,
    find_friend_in,
    find_friend_out,
    search_friend,
    add_friends,
    accept_friend,
    reject_friend,
    reset_password,
    add_to_personal_watchlist,
    get_watchlist,
    delete_from_personal_watchlist,
    getUserInfo,
    changeUserInfo,
    resetAccount,
    self_reset_password,
};
