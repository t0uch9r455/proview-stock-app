import React from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import { useState, useEffect, useRef } from "react";
import "./ChatPage.css";
import ChatBox from "./ChatBox";
import { useLocation } from "react-router-dom";

function ChatPage() {
    const location = useLocation();
    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail(location.state);
    }, []);

    return (
        <div className="chat_page">
            <div className="chat_component">
                <div className="chatHeader">
                    <h3> Chat</h3>
                </div>
                <div className="chat_down">
                    <div className="friend_list">
                        <FriendList listtype="Friends" />
                    </div>
                    <ChatBox email={email} groupId="" />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
