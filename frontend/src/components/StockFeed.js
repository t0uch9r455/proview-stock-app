import React from "react";
import Stock from "./Stock";
import "./StockFeed.css";
import WatchList from "./WatchList";
import Clock from "./Clock";

import { useEffect, useState } from "react";
function StockFeed() {
    // const stocks = ["META", "GOOG", "AAPL", "ABNB", "TSLA", "MSFT"];
    //const stocks = ["META", "GOOG", "AAPL"];

    const [watchList, setWatchList] = useState([]);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        getList();
        sleep(1000);
    }, []);

    const getList = () => {
        fetch("http://localhost:5050/api/getWatchList", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    if (data.list.length != 0) {
                        setWatchList(data.list);
                    } else {
                        setWatchList(["aapl", "tsla", "meta"]);
                    }
                    console.log(watchList);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    // const getStocks = () => {
    //     let list = [];
    //     watchList.forEach((stockSymbol) => {
    //         sleep(1000);
    //         list.push(<Stock key={stockSymbol} stockSymbol={stockSymbol} />);
    //     });
    //     return list;
    // };

    const STocks = watchList.forEach((stockSymbol) => {
        sleep(1000);
        return <Stock key={stockSymbol} stockSymbol={stockSymbol} />;
    });

    const [count, setCount] = useState(0);

    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
            if (counter >= watchList.length) {
                clearInterval(interval);
            } else {
                setCount((count) => count + 1);
                counter++; // local variable that this closure will see
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [watchList]);

    let playersDraftedList = watchList.slice(0, count).map((stockSymbol) => {
        return <Stock key={stockSymbol} stockSymbol={stockSymbol} />;
    });

    return (
        <div className="feed">
            <div className="feedHeader">
                <Clock></Clock>
            </div>
            {/* <SearchBox/> */}
            <div className="watchList_flex">
                <div className="watch_list">
                    {playersDraftedList}

                    {/* {watchList.map((stockSymbol) => (
                        <Stock key={stockSymbol} stockSymbol={stockSymbol} />
                    ))} */}
                </div>
                <div className="watch">
                    <WatchList className="WatchList" />
                </div>
            </div>
        </div>
    );
}

export default StockFeed;
