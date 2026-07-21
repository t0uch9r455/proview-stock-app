import React from "react";
import "./FriendTag.css";
import { useNavigate, useLocation } from "react-router-dom";
import "./GroupTag.css";

function GroupTag({ name, id, button }) {
    const navigate = useNavigate();

    const handleButton = () => {
        if (button === "add") {
            addGroup();
        } else if (button === "chat") {
            console.log(id);
            navigate("/group", { state: id });
        }
        window.location.reload();
    };

    const addGroup = () => {
        fetch("http://localhost:5050/api/addMember", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupId: id }),
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="friendTag">
            <div className="info">
                <span>Group_Name: {name}</span>
            </div>
            <button className="button_div" onClick={handleButton}>
                {button}
            </button>
        </div>
    );
}

export default GroupTag;
