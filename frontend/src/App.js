import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stock from "./components/Stock";

import Alarmpage from "./components/Alarmpage.js";
import StockList from "./components/StockList.js";
import Friends from "./components/Friends";
import Search_page from "./components/Search_page";
import ChatPage from "./components/ChatPage";
import GroupPage from "./components/GroupPage";
import Community from "./components/Community";
import PaperTrading from "./components/PaperTrading";
import Sidebar from "./components/Sidebar";
import StockFeed from "./components/StockFeed";
import TutorialPage from "./components/TutorialPage";
import Profile from "./components/Profile";

import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Reset from "./components/Reset.js";
import News from "./components/News.js";
import { Outlet } from "react-router-dom";

function App() {
    const SidebarLayout = () => (
        <>
            <div className="flex">
                <Sidebar />
                <div className="outlet">
                    <Outlet />
                </div>
            </div>
        </>
    );

    return (
        <Router>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/alarmpage" element={<Alarmpage />} />
                    <Route path="/home" element={<StockFeed />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/hotlist" element={<StockList />} />
                    <Route path="/search" element={<Search_page />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/group" element={<GroupPage />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/papertrading" element={<PaperTrading />} />
                    <Route path="/tutorial" element={<TutorialPage />} />
                    <Route path="/news" element={<News />} />
                </Route>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>
        </Router>
    );
}

export default App;
