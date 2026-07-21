import React from "react";

import "./Profile.css";
import AvatarUpload from "./AvatarUpload";
import ProfileUpdate from "./ProfileUpdate";
import { useEffect, useState } from "react";

function Profile() {
    const [biology, setBio] = useState("");
    const [active, setActive] = useState(true);

    const submitChange = () => {
        fetch("http://localhost:5050/api/changeUserInfo", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                biology,
            }),
        })
            .then((res) => {
                setActive(true);
                return;
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });
    };

    const handleClick = (e) => {
        if (e.detail === 2) {
            setActive(false);
        }
    };

    useEffect(() => {
        const getUserInfo = () => {
            fetch("http://localhost:5050/api/getUserInfo", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setBio(data.biology);
                });
        };
        getUserInfo();
    }, [active]);

    return (
        <div className="profile">
            <div className="profile_header">
                <h3> Profile</h3>
            </div>
            <div className="profile_flex">
                <div className="info_flex">
                    <ProfileUpdate />
                </div>
                <div className="avatar_flex">
                    <AvatarUpload />

                    <div className="biologyboard">
                        <h3>Biology</h3>
                        {active ? (
                            <div className="bio_content" onClick={handleClick}>
                                {biology ? biology : "My Biology ..."}
                            </div>
                        ) : (
                            <textarea
                                value={biology}
                                type="text"
                                className="biology_area"
                                onChange={(e) => setBio(e.target.value)}
                            />
                        )}
                        <button
                            className={active ? "savebio active" : "savebio"}
                            onClick={submitChange}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
