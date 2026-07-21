import React, { useState, useEffect } from "react";
import "./Community.css";
import Sidebar from "./Sidebar";
import GroupList from "./GroupList";
import "./Community.css";

function Community() {
    return (
        <div className="community">
            <div className="community_component">
                <div className="hotHeader">
                    <h3> Create or find groups </h3>
                </div>
                <div className="find">
                    <div className="list1">
                        <div className="groups">
                            <GroupList listtype="My Groups" />
                        </div>
                    </div>
                    <div className="list1">
                        <div className="groups">
                            <GroupList listtype="Searching" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Community;
