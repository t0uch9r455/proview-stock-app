import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SidebarOpt from "./SidebarOpt";
import PeopleIcon from "@mui/icons-material/People";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchIcon from "@mui/icons-material/Search";
import AlarmIcon from "@mui/icons-material/Alarm";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SchoolIcon from "@mui/icons-material/School";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import "./Sidebar.css";
import PsychologyIcon from "@mui/icons-material/Psychology";
function Sidebar() {
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={sidebar ? "test_1" : "test_2"}>
            <div className="logo" onClick={showSidebar}>
                {sidebar ? "Proview" : "P"}
            </div>
            <br />

            <div className={sidebar ? "nav-menu active" : "nav-menu"}>
                <SidebarOpt Icon={HomeIcon} text="Home" />
                <SidebarOpt Icon={PersonIcon} text="Profile" />
                <SidebarOpt Icon={SchoolIcon} text="Tutorial" />
                <SidebarOpt Icon={NewspaperIcon} text="News" />
                <SidebarOpt Icon={LocalFireDepartmentIcon} text="HotList" />
                <SidebarOpt Icon={SearchIcon} text="Search" />
                <SidebarOpt Icon={AlarmIcon} text="Alarm" />
                <SidebarOpt Icon={PeopleIcon} text="Friends" />
                <SidebarOpt Icon={PeopleIcon} text="Chat" />
                <SidebarOpt Icon={PeopleIcon} text="Community" />
                <SidebarOpt Icon={PeopleIcon} text="Group" />
                <SidebarOpt Icon={ShowChartIcon} text="Trading" />
                <SidebarOpt Icon={LogoutIcon} text="Logout" />
            </div>
        </div>
    );
}

export default Sidebar;
