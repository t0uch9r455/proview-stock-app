import React from "react";

import "./ProfileUpdate.css";
import { useEffect, useState } from "react";
import TAlert from "./alert";
import { ToastContainer } from "react-toastify";

function ProfileUpdate() {
    const [user, setUser] = useState({
        username: "",
        // new_password: "",
        phone_number: "",
        biology: "",
    });
    const [user_password, setUserPass] = useState({
        new_password: "",
        confirm_password: "",
    });
    const [userInfo, setUserInfo] = useState({
        username: "",
        phone_number: "",
        biology: "",
        email: "",
    });
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleChangePass = (e) => {
        setUserPass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitChangePass = (e) => {
        e.preventDefault();
        console.log(user_password);
        if (
            !user_password.new_password ||
            !user_password.confirm_password ||
            user_password.new_password != user_password.confirm_password ||
            user_password.new_password.length < 6
        ) {
            TAlert("Input is invalid");
            setUserPass({ new_password: "", confirm_password: "" });
            return;
        }
        fetch("http://localhost:5050/api/selfReset", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: user_password.new_password,
            }),
        })
            .then((res) => {
                if (res.status != 200) {
                    TAlert("Input is invalid");
                    setUserPass({ new_password: "", confirm_password: "" });

                    return;
                }
                // return;
                setUserPass({ new_password: "", confirm_password: "" });
                alert("Success!");
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });
        // fetch end point
    };
    const submitChange = (e) => {
        e.preventDefault();
        console.log(user);
        fetch("http://localhost:5050/api/changeUserInfo", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user.username,
                phone_number: user.phone_number,
                biology: user.biology,
            }),
        })
            .then((res) => {
                // return;
                getUserInfo();
                setUser({ username: "", phone_number: "", biology: "" });
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });
        // fetch end point
    };
    const Restart = (e) => {
        fetch("http://localhost:5050/api/resetAccount", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                console.log(res);
                // console.log(res.body());
                if (res.status === 200) {
                    alert("Success!");
                }
                return res.json();
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });
    };

    const getUserInfo = () => {
        fetch("http://localhost:5050/api/getUserInfo", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                //
                console.log(res);

                // console.log(res.body());
                return res.json();
            })
            .then((data) => {
                setUserInfo(data);
                console.log(data);
                console.log(user);
                // setMsgs(data.msgs);
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="profile_whole">
                <div className="profile_whole_border">
                    <div className="my_information">
                        <h3 className="h3_profile_top">
                            {" "}
                            My Account Information
                        </h3>
                        <h6> Username: {userInfo.username} </h6>
                        <h6> Email: {userInfo.email} </h6>
                        <h6> Phone Number: {userInfo.phone_number} </h6>
                        {/* get my information from database */}
                    </div>
                    <div className="change_information">
                        <form onSubmit={submitChange}>
                            <h3 className="h3_profile">Change Information</h3>
                            <div className="profile_update_main">
                                <input
                                    value={user.username}
                                    type="text"
                                    name="username"
                                    className="profile_input"
                                    onChange={handleChange}
                                    placeholder="Change Username"
                                />
                                {/* <input
                                type="text"
                                name="new_password"
                                className="profile_input"
                                onChange={handleChange}
                                placeholder="Change Password"
                            /> */}
                                <input
                                    value={user.phone_number}
                                    type="text"
                                    name="phone_number"
                                    className="profile_input"
                                    onChange={handleChange}
                                    placeholder="Change phone number"
                                />
                                {/* <textarea
                                    value={user.biology}
                                    type="text"
                                    name="biology"
                                    className="profile_input"
                                    onChange={handleChange}
                                    placeholder="Change biology"
                                /> */}
                                <button className="profile_input">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <form onSubmit={submitChangePass}>
                            <h3 className="h3_profile">Change Password</h3>
                            <div className="profile_update_main">
                                <input
                                    value={user_password.new_password}
                                    type="text"
                                    name="new_password"
                                    className="profile_input"
                                    onChange={handleChangePass}
                                    placeholder="New Password"
                                />
                                <input
                                    value={user_password.confirm_password}
                                    type="text"
                                    name="confirm_password"
                                    className="profile_input"
                                    onChange={handleChangePass}
                                    placeholder="Confirm Password"
                                />
                                <button className="profile_input">
                                    ChangePassword
                                </button>
                            </div>
                        </form>
                        <div className="profile_reset">
                            <h6>
                                This Button will clear your Paper Trading
                                history and reset your account balance to 0. BE
                                CAREFUL!
                            </h6>
                            <button
                                onClick={Restart}
                                className="profile_reset_button"
                            >
                                Restart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUpdate;
