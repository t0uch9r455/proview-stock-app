import React from "react";
import GroupTag from "./GroupTag";
import { useEffect, useState } from "react";
import "./GroupList.css";

function GroupList({ listtype }) {
    const [groupList, setGroupList] = useState([]);
    const [button, setButton] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        if (listtype === "My Groups") {
            setButton("chat");
            // getMyGroups();
        } else if (listtype === "Searching") {
            setButton("add");
        }
    }, []);

    useEffect(() => {
        if (listtype === "My Groups") {
            getMyGroups();
        }
    }, [listtype]);

    const getMyGroups = () => {
        fetch("http://localhost:5050/api/getMyGroups", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.myGroups) {
                    setGroupList(data.myGroups);
                    //console.log(friendlist);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    const handleCreate = () => {
        fetch("http://localhost:5050/api/createGroup", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupName: input }),
        }).catch((error) => {
            console.log("error");
        });
        window.location.reload();
        setInput("");
    };

    const handleSearch = () => {
        fetch("http://localhost:5050/api/findGroup", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupName: input }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.result) {
                    setGroupList(data.result);
                    //console.log(friendlist);
                }
            })
            .catch((error) => {
                console.log("error");
            });
        // window.location.reload();
        setInput("");
    };

    return (
        <div className="frds">
            <div className="frdsHeader">
                <h3>{listtype}</h3>
            </div>
            <div className="inputbar">
                {listtype === "Searching" && (
                    <div>
                        <input
                            className="groupinput"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                        <button className="searching" onClick={handleCreate}>
                            Create
                        </button>
                        <button className="searching" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )}
            </div>
            <div className="frdlist">
                {groupList.map((info) => (
                    <GroupTag
                        key={info.id}
                        name={info.name}
                        id={info.id}
                        button={button}
                    />
                ))}
            </div>
        </div>
    );
}

export default GroupList;
