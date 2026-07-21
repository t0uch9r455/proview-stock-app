import React from "react";
import "./SidebarOpt.css";
import { useNavigate } from "react-router-dom";

function SidebarOpt({ text, Icon, func }) {
    const navigate = useNavigate();
    const logout = () => {
        fetch("http://localhost:5050/api/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                // if (response.status === 400) {
                navigate("/login");
                // }
                // return response.json();
            })
            // .then((data) => {
            //     navigate("/login");
            // })
            .catch((error) => {
                console.log("error occured in logout fetch");
            });
    };

    const handleClick = () => {
        if (text === "Logout") {
            logout();
        } else if (text === "Home") {
            navigate("/home");
        } else if (text === "Friends") {
            navigate("/friends");
        } else if (text === "HotList") {
            navigate("/hotlist");
        } else if (text === "Search") {
            navigate("/search");
        } else if (text === "Alarm") {
            navigate("/alarmpage");
        } else if (text === "Chat") {
            navigate("/chat");
        } else if (text === "Group") {
            navigate("/group");
        } else if (text === "Community") {
            navigate("/community");
        } else if (text === "Trading") {
            navigate("/papertrading");
        } else if (text === "Tutorial") {
            navigate("/tutorial");
        } else if (text === "Profile") {
            navigate("/profile");
        } else if (text === "News") {
            navigate("/news");
        }
    };

    return (
        <button className="sidebarOption" onClick={handleClick}>
            <Icon className="icon" />
            <h2 className="iconText">{text}</h2>
        </button>
    );
}

export default SidebarOpt;
