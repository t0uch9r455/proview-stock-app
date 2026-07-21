import React from "react";
import FriendTag from "./FriendTag";
import { useEffect, useState } from "react";

function FriendList({ listtype }) {
    const [friendlist, setFriendList] = useState([]);
    const [button, setButton] = useState("");

    useEffect(() => {
        console.log(listtype);
        if (listtype === "Friends") {
            setButton("chat");
            getFriends();
        } else if (listtype === "Received requests") {
            setButton("accept");
            getFriendsIn();
        } else if (listtype === "Requests sent") {
            setButton("waiting");
            getFriendsOut();
        }
    }, []);

    const getFriends = () => {
        fetch("http://localhost:5050/api/findf", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    setFriendList(data.list);
                    //console.log(friendlist);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    const getFriendsIn = () => {
        fetch("http://localhost:5050/api/findfin", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    setFriendList(data.list);
                    //console.log(friendlist);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    const getFriendsOut = () => {
        fetch("http://localhost:5050/api/findfout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    setFriendList(data.list);
                    //console.log(friendlist);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    return (
        <div className="frds">
            <div className="frdsHeader">
                <h3>{listtype}</h3>
            </div>
            <div className="frdlist">
                {friendlist.map((info) => (
                    <FriendTag
                        key={info[1]}
                        name={info[0]}
                        email={info[1]}
                        button={button}
                        // setEmail={setEmail}
                    />
                ))}
            </div>
        </div>
    );
}

export default FriendList;
