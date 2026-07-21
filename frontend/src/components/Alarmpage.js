import React, { Fragment } from "react";
//import "fdweb/normalize.css";
//import "fdweb/fluent.css";
//import "fdweb/fluent-icons.css";
import "./Alarmpage.css";
import Alarm from "./AlarmComp";
import Sidebar from "./Sidebar";
import Clock from "./Clock";

const Alarmpage = () => {
    return (
        <div className="alarmpage">
            <div className="alarm">
                <div className="alarmHeader">
                    <Clock></Clock>
                </div>
                <Alarm />
            </div>
        </div>
    );
};

export default Alarmpage;
