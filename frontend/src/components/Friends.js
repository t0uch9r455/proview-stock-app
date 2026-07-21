import React from "react";
import "./Friends.css";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import { useEffect, useState } from "react";
import FriendTag from "./FriendTag";
function Friends() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [email_back, setEmailback] = useState("");

    useEffect(() => {
        searchUser();
    }, [email]);

    const searchUser = () => {
        fetch("http://localhost:5050/api/searchf", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                if (data.info) {
                    console.log(data.info[0]);
                    setName(data.info[0]);
                    setEmailback(data.info[1]);
                }
            })
            .catch((error) => {
                console.log("error");
            });
    };

    return (
        <div className="friends">
            <div className="friends_container">
                <div className="friendsHeader">
                    <h3> Friends</h3>
                </div>
                <div className="part">
                    <div className="friendlist">
                        <FriendList listtype="Friends" />
                    </div>
                    <div className="friendlist_2">
                        <div className="div_1">
                            <FriendList listtype="Received requests" />
                        </div>
                        <div className="div_1">
                            <FriendList listtype="Requests sent" />
                        </div>
                    </div>
                    <div className="frdSearchBar">
                        <h3>Search Friend</h3>
                        <input
                            className="inputfield"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        {/* <button className="searchButton" onClick={searchUser}>
                    Search
                </button> */}
                        <FriendTag
                            name={name}
                            email={email_back}
                            button="add a friend"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Friends;
