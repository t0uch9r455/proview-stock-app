import React from "react";
import dateFormat, { masks } from "dateformat";
import { Menu, Select } from "@mui/material";
import "./Clock.css";

class Clock extends React.Component {
    constructor() {
        super();
        var timezone = -4;
        var offset_GMT = new Date().getTimezoneOffset();
        var nowDate = new Date().getTime();
        var targetDate = new Date(
            nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
        );
        this.state = {
            time:
                targetDate.toDateString() +
                targetDate.getHours().toString() +
                ":" +
                targetDate.getMinutes().toString() +
                "  ",
        };
        this.zone = -4;
    }

    update_5() {
        this.zone = -4;
    }

    update_8() {
        this.zone = 8;
        console.log("1");
    }

    update_1() {
        this.zone = 1;
    }

    updateTime() {
        this.interval = setInterval(() => {
            var timezone = this.zone;
            var offset_GMT = new Date().getTimezoneOffset();
            var nowDate = new Date().getTime();
            var targetDate = new Date(
                nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
            );
            this.setState({
                time:
                    targetDate.toDateString() +
                    "   " +
                    targetDate.getHours().toString() +
                    ":" +
                    targetDate.getMinutes().toString() +
                    "  ",
            });
        }, 100);
    }
    componentDidMount() {
        this.updateTime();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const handleChange = (e) => {
            if (e.target.value == "5") {
                this.update_5();
            } else if (e.target.value == "1") {
                this.update_1();
            } else if (e.target.value == "9") {
                this.zone = 9;
            } else if (e.target.value == "-7") {
                this.zone = -7;
            } else if (e.target.value == "5.5") {
                this.zone = 5.5;
            } else {
                this.update_8();
            }
        };
        return (
            <div className="main">
                <div className="bar">
                    <select onChange={(e) => handleChange(e)}>
                        <option value="5">GMT -5 Newyork</option>
                        <option value="1">GMT +1 Europe</option>
                        <option value="8">GMT +8 China</option>
                        <option value="9">GMT +9 Tokyo</option>
                        <option value="-7">GMT -7 LA</option>
                        <option value="5.5">GMT +5:30 India</option>
                    </select>
                </div>
                <div className="text">
                    <h3>{this.state.time}</h3>
                </div>
            </div>
        );
    }
}

export default Clock;
