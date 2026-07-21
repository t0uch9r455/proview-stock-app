import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import ResponsivePlayer from "./ResponsePlayer.jsx";
import "./TutorialPage.css";

const TutorialPage = () => {
    return (
        <div className="tut">
            <div className="tutHeader">
                <h1>Tutorial Page</h1>
            </div>
            <div className="tutbody">
                <div className="StockConcept">
                    <div className="StockText">
                        <h2>What is Stock?</h2>
                        <h4>
                            Stock is a security that represents the ownership of
                            a fraction of the issuing corporation
                        </h4>
                        <h4>
                            Stocks are bought and sold predominantly on stock
                            exchanges and are the foundation of many individual
                            investors' portfolios
                        </h4>
                        <h4>
                            A stock is a type of investment that represents an
                            ownership share in a company. Investors buy stocks
                            that they think will go up in value over time.
                        </h4>
                    </div>
                    <div className="StockVideo">
                        <ResponsivePlayer give_url="https://www.youtube.com/watch?v=o4jfBC0AgIM"></ResponsivePlayer>
                    </div>
                </div>
                <div className="StockMarketConcept">
                    <div className="StockMarketText">
                        <h2>What is Stock Market?</h2>
                        <h4>
                            The stock market refers to public markets that exist
                            for issuing, buying, and selling stocks that trade
                            on a stock exchange or over-the-counter
                        </h4>
                        <h4>
                            The stock market provide capital to companies that
                            they can use to fund and expand their businesses and
                            serves is to give investors the opportunity to share
                            in the profits of publicly-traded companies{" "}
                        </h4>
                        <a
                            href="http://localhost:3000/search"
                            className="SearchButton"
                        >
                            Check Hotlist
                        </a>
                    </div>
                    <div className="StockMarketVideo">
                        <ResponsivePlayer give_url="https://www.youtube.com/watch?v=p7HKvqRI_Bo"></ResponsivePlayer>
                    </div>
                </div>
                <div className="ChooseStockConcept">
                    <div className="ChooseStockText">
                        <h2>How to choose stock?</h2>
                        <h4>
                            Stock is a security that represents the ownership of
                            a fraction of the issuing corporation
                        </h4>
                        <h4>
                            Stocks are bought and sold predominantly on stock
                            exchanges and are the foundation of many individual
                            investors' portfolios
                        </h4>
                        <a
                            href="http://localhost:3000/search"
                            className="SearchButton"
                        >
                            Search for a Stock
                        </a>
                    </div>
                    <div className="StockMarketVideo">
                        <ResponsivePlayer give_url="https://www.youtube.com/watch?v=2I_GZebHd8Y"></ResponsivePlayer>
                    </div>
                </div>
                <div className="ReadStockConcept">
                    <div className="ReadStockText">
                        <h2>How to read stock charts?</h2>
                        <h4>
                            Identify the charts and look at the top where you
                            will find a ticker designation or symbol which is a
                            short alphabetic identifier of a company
                        </h4>
                        <h4>Look for lines of support and resistance </h4>
                        <h4>Know when dividends and stock splits occur</h4>
                        <h4>Understand historic trading volumes</h4>
                        <a
                            href="http://localhost:3000/search"
                            className="SearchButton"
                        >
                            Home Page
                        </a>
                    </div>
                    <div className="ReadStockVideo">
                        <ResponsivePlayer give_url="https://www.youtube.com/watch?v=Lz9ysR-a0RQ"></ResponsivePlayer>
                    </div>
                </div>
                <div className="InvestConcept">
                    <div className="InvestText">
                        <h2>How to Start Investing in Stocks</h2>
                        <h4>
                            Learn to Read financial articles, stock market
                            books, website tutorials, etc. There's a wealth of
                            information out there, much of it inexpensive to
                            tap. It's important not to focus too narrowly on one
                            single aspect of the trading game{" "}
                        </h4>
                        <h4>
                            Practice Trading, or virtual trading, offers a
                            perfect solution, allowing the neophyte to follow
                            real-time market actions, making buying and selling
                            decisions that form the outline of a theoretical
                            performance record
                        </h4>

                        <a
                            href="http://localhost:3000/papertrading"
                            className="SearchButton"
                        >
                            Paper Trading
                        </a>
                    </div>
                    <div className="InvestVideo">
                        <ResponsivePlayer give_url="https://www.youtube.com/watch?v=ieuzJ5B5Lr8"></ResponsivePlayer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialPage;
