import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import "./News.css";
import NewsItem from "./NewsItem";
import Sidebar from "./Sidebar";
import Stock from "./Stock";
import TAlert from "./alert";
import Clock from "./Clock";

import { ToastContainer } from "react-toastify";
const News = () => {
    const [articles, setArticles] = useState([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [stockname, setStockname] = useState("");

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(
                // `https://newsapi.org/v2/everything?q=stocks&apiKey=2794e262e99e427d92f32dbeb4bdaccd`
                `https://newsapi.org/v2/top-headlines?q=stocks&category=business&apiKey=2794e262e99e427d92f32dbeb4bdaccd`
            );
            setArticles(response.data.articles);
            console.log(response);
        };

        getArticles();
    }, []);
    return (
        <div className="news_whole">
            <div className="news_header">
                <h3> News</h3>
            </div>
            <div className="news_body">
                {articles.map((article) => {
                    return (
                        <NewsItem
                            title={article.title}
                            description={article.description}
                            url={article.url}
                            urlToImage={article.urlToImage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default News;
