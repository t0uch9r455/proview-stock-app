import React from "react";
import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import "./PaperTrading.css";
import Stock from "./Stock";
import StockTag from "./StockTag";
import TAlert from "./alert";
import HistoryTag from "./HistoryTag";

function PaperTrading() {
    const [flag, setFlag] = useState(true);
    const [flag2, setFlagTwo] = useState(true);
    const [watchList, setWatchList] = useState([]);
    const [balance, setBalance] = useState(100000);
    const [input, setInput] = useState("");

    const [cost, setCost] = useState(0);
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState("");
    const [stockArray, setStockArray] = useState([]);
    const [list, setList] = useState(true);
    const [hotlist, setHotlist] = useState([]);

    const [historyList, setHistory] = useState([]);
    const [hlist, setHList] = useState(true);
    const [autotrading, setAutotrading] = useState(false);
    const [flashing, setFlash] = useState(false);
    const [autotrade_amount, setAutoTradeAmount] = useState("");

    useEffect(() => {
        setCost(amount * price);
    }, [amount, price]);

    useEffect(() => {
        getPrice();
        // });
    }, [amount, stock]);

    const API_KEY = "V59N2LFKMSXQWONN";
    const sandboxToken = "Tpk_245594011ed142fca35e0d76758e1d33";
    const realToken = "pk_0e6314b0afd047f3bb2da2517debc3a0";
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const getPrice = async () => {
        if (!stock) return;
        const real = `https://cloud.iexapis.com/stable/stock/${stock}/price?token=${realToken}`;
        const sandbox = `https://sandbox.iexapis.com/stable/stock/${stock}/price?token=${sandboxToken}`;
        const response = await fetch(sandbox)
            .then((response) => {
                if (response.status === 429) {
                    // console.log("here");
                    sleep(200).then(() => getPrice());
                }
                return response.json();
            })
            .then((data) => {
                setPrice(data);
            });
    };

    useEffect(() => {
        setHotlist([]);
        const getHotlist = async () => {
            const check1 = localStorage.getItem("stockHotlist");
            if (check1 !== null) {
                setHotlist([]);
                for (const key in JSON.parse(check1)) {
                    setHotlist((hotlist) => [
                        ...hotlist,
                        JSON.parse(check1)[key]["symbol"],
                    ]);
                }
            } else {
                var axios = require("axios").default;
                var options = {
                    method: "GET",
                    url: "https://yfapi.net/v1/finance/trending/us",

                    headers: {
                        // "x-api-key": "mqGwUbeB2K1t2FFNFFXaV8mXEPBry3hX7rGo1R0n",
                        "x-api-key": "RIFrduAEmH4ZWA5CdBpylaV31kKt8wUT2stzO3cs",
                    },
                };
                axios
                    .request(options)
                    .then(function (response) {
                        localStorage.setItem(
                            "stockHotlist",
                            JSON.stringify(
                                response.data["finance"]["result"][0]["quotes"]
                            )
                        );
                        // setStockHotlist([]);
                        setHotlist(
                            JSON.stringify(
                                response.data["finance"]["result"][0]["quotes"]
                            )
                        );
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        };
        getHotlist();
    }, []);

    const buyLocalButton = () => {
        if (balance - cost < 0) {
            alert("not enough funds");
        } else {
            // setStockArray([...stockArray, stock]);
            buystock();
        }

        // getBalance();
        // getStocksBought();
    };

    useEffect(() => {
        const getBalance = async () => {
            fetch("http://localhost:5050/api/getBalance", {
                method: "GET",
                credentials: "include",
                // headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ stock, price: cost, amount: 1 }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setBalance(data.balance);
                })
                .catch((error) => {
                    console.log("error occured in buying stock");
                });
        };

        const getStocksBought = async () => {
            fetch("http://localhost:5050/api/getBought", {
                method: "GET",
                credentials: "include",
                // headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ stock, price: cost, amount: 1 }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setStockArray(data.stocks);
                })
                .catch((error) => {
                    console.log("error occured in buying stock");
                });
        };

        const getHistory = async () => {
            fetch("http://localhost:5050/api/gethistory", {
                method: "GET",
                credentials: "include",
                // headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ stock, price: cost, amount: 1 }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.history);
                    setHistory(data.history);
                })
                .catch((error) => {
                    console.log("error occured in buying stock");
                });
        };

        getBalance();
        getStocksBought();
        getHistory();
    }, [flag2, hlist]);

    const sellLocalButton = () => {
        // setStockArray([...stockArray, stock]);
        sellstock();
        // getBalance();
        // getStocksBought();
    };

    // useEffect(() => {
    //     getBalance();
    //     getStocksBought();
    // }, [stock]);

    const buystock = () => {
        console.log(stock);
        console.log(amount);
        console.log(price);
        fetch("http://localhost:5050/api/buystock", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stock: stock.toUpperCase(),
                price,
                amount: parseInt(amount),
            }),
        })
            .then((response) => {
                setFlagTwo(!flag2);
                return;
            })
            .catch((error) => {
                console.log("error occured in buying stock");
            });

        // setStock("");

        setAmount(0);
    };

    const sellstock = () => {
        console.log(stock);
        console.log(amount);
        console.log(price);
        fetch("http://localhost:5050/api/sellstock", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stock: stock.toUpperCase(),
                price: price,
                amount: parseInt(amount),
            }),
        })
            .then((response) => {
                if (response.status === 429) {
                    TAlert("No enough stock to sell!");
                }
                setFlagTwo(!flag2);
                return;
            })
            .catch((error) => {
                console.log("error occured in selling stock");
            });

        // setStock("");
        setAmount(0);
    };

    const handlePersonalWatchList = () => {
        if (stock === "") {
            TAlert("Input is invalid!");
            return;
        }
        fetch("http://localhost:5050/api/addWatchList", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stockname: stock }),
        })
            .then((response) => {
                console.log("success");
                setFlag(!flag);
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setWatchList([]);
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
                        setWatchList(data.list);
                        // console.log(watchList);
                    }
                })
                .catch((error) => {
                    console.log("error occured in login fetch");
                });
        };

        getList();
    }, [flag, list]);

    const tradeTag = () => {
        return (
            <div className="tradeTag">
                <div className="tradeTag_left">
                    <h2>{stock ? stock.toUpperCase() : "stock"}</h2>
                </div>
                <div className="tradeTag_middle">
                    <div>Price: {price}</div>
                    <div>Your Cost: {cost}</div>
                </div>
                <div className="tradeTag_right">
                    <input
                        className="amount_input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Set Amount"
                    />
                    <button className="buy_stock" onClick={buyLocalButton}>
                        Buy
                    </button>
                    <button className="buy_stock" onClick={sellLocalButton}>
                        Sell
                    </button>
                </div>
            </div>
        );
    };

    // const myStocks = stockArray.map((item, index) => {
    //     return (
    //         <div key={item.symbol} className="mystock">
    //             <div>
    //                 {item.symbol}: {item.amount}
    //             </div>
    //         </div>
    //     );
    // });

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
            if (counter >= (list ? watchList : hotlist).length) {
                clearInterval(interval);
            } else {
                setCount((count) => count + 1);
                counter++; // local variable that this closure will see
            }
        }, 700);
        return () => clearInterval(interval);
    }, [watchList]);

    useEffect(() => {
        let counter = count2;
        const interval = setInterval(() => {
            if (counter >= (hlist ? stockArray : historyList).length) {
                clearInterval(interval);
            } else {
                setCount2((count2) => count2 + 1);
                counter++; // local variable that this closure will see
            }
        }, 700);
        return () => clearInterval(interval);
    }, [stockArray]);

    let watchingList = () => {
        // clear the watchlist
        return (
            <>
                {(list ? watchList : hotlist).slice(0, count).map((item) => {
                    return (
                        <div
                            key={item}
                            className="table_element"
                            onClick={() => setStock(item)}
                        >
                            <StockTag stockSymbol={item} position="a" />
                        </div>
                    );
                })}
            </>
        );
    };

    // let stockHotlist = hotlist.slice(0, count).map((item) => {
    //     return (
    //         <div className="table_element" onClick={() => setStock(item)}>
    //             <StockTag stockSymbol={item} position="a" />
    //         </div>
    //     );
    // })

    const left = () => {
        return (
            <div>
                <h3> Start Your Trading </h3>
                <input
                    className="stock_input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search stock to buy"
                />
                <div className="trade_buttons">
                    <button
                        className="buy_stock"
                        onClick={() => setStock(input)}
                    >
                        Search
                    </button>
                    <button
                        className="buy_stock"
                        onClick={handlePersonalWatchList}
                    >
                        Add
                    </button>
                </div>
                {listTitle()}
                <div className="trading_watchList">
                    {list ? <h3> My Watch List </h3> : <h3> Hot List </h3>}
                    <div className="watchList_white">
                        <div className="table_header">
                            <StockTag stockSymbol={"Stock"} position="t" />
                        </div>

                        {watchingList()}
                    </div>
                </div>
                {/* <h4>
                    My Balance: <br /> {balance}
                </h4> */}
            </div>
        );
    };

    const listTitle = () => {
        return (
            <div className="listTitle">
                <div
                    className={
                        list ? "listTitle_watch active" : "listTitle_watch"
                    }
                    onClick={() => setList(true)}
                >
                    WatchList
                </div>
                <div
                    className={list ? "listTitle_hot" : "listTitle_hot active"}
                    onClick={() => setList(false)}
                >
                    HotList
                </div>
            </div>
        );
    };

    const historyTitle = () => {
        return (
            <div className="listTitle">
                <div
                    className={
                        hlist ? "listTitle_watch active" : "listTitle_watch"
                    }
                    onClick={() => setHList(true)}
                >
                    My Stocks
                </div>
                <div
                    className={hlist ? "listTitle_hot" : "listTitle_hot active"}
                    onClick={() => setHList(false)}
                >
                    History
                </div>
            </div>
        );
    };

    const listOfHistory = () => {
        return (
            <>
                <div className="table_header">
                    <HistoryTag
                        stockSymbol={"e"}
                        position={hlist ? "sh" : "hh"}
                    />
                </div>
                {(hlist ? stockArray : historyList)
                    .slice(0, count2)
                    .map((item, index) => {
                        return (
                            <div key={index} className="table_element">
                                <HistoryTag
                                    stockSymbol={item}
                                    position={hlist ? "s" : "h"}
                                />
                            </div>
                        );
                    })}
            </>
        );
    };

    const right = () => {
        return (
            <div>
                {historyTitle()}
                <div className="trading_historyList">
                    {hlist ? <h3> My Stock </h3> : <h3> History </h3>}
                    <div className="historyList_white">
                        <div className="table_header">
                            {/* <HistoryTag
                                stockSymbol="not use"
                                position={hlist ? "sh" : "hh"}
                            /> */}
                            {/* {hlist ? (
                                <HistoryTag position="sh" />
                            ) : (
                                <HistoryTag position="hh" />
                            )} */}
                        </div>
                        {listOfHistory()}
                    </div>
                </div>
                <h4>
                    My Balance: <br /> {parseFloat(balance).toFixed(2)}
                </h4>
            </div>
        );
    };

    const flash = () => {
        setFlash(true);
        sleep(500).then(() => {
            setFlash(false);
        });
    };

    useEffect(() => {
        if (!autotrading) return;
        const interval = setInterval(() => {
            let autoprice = 0;

            const sandboxToken = "Tpk_245594011ed142fca35e0d76758e1d33";
            const intraday = `https://sandbox.iexapis.com/stable/stock/${stock}/intraday-prices?token=${sandboxToken}`;

            const getAutoData = async () => {
                if (!stock) return;
                fetch(intraday)
                    .then((response) => {
                        if (response.status === 429) {
                            // console.log("here");
                            sleep(200).then(() => getAutoData());
                        }
                        return response.json();
                    })
                    .then((data) => {
                        var difference =
                            data[data.length - 2]["high"] -
                            data[data.length - 3]["high"];
                        // console.log(difference);
                        // setDiff(difference);
                        // console.log(data[data.length - 2]["high"]);
                        autoprice = data[data.length - 2]["high"];
                        if (difference >= 0) {
                            console.log(parseInt(autotrade_amount));
                            console.log(stock);
                            console.log(autoprice);
                            fetch("http://localhost:5050/api/buystock", {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    stock: stock.toUpperCase(),
                                    price: autoprice,
                                    amount: parseInt(autotrade_amount),
                                }),
                            })
                                .then((response) => {
                                    setFlagTwo(!flag2);
                                    return;
                                })
                                .catch((error) => {
                                    console.log(
                                        "error occured in buying stock"
                                    );
                                });
                        } else {
                            console.log("less");
                            console.log(parseInt(autotrade_amount));
                            console.log(stock);
                            console.log(price);
                            fetch("http://localhost:5050/api/sellstock", {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    stock: stock.toUpperCase(),
                                    price: autoprice,
                                    amount: parseInt(autotrade_amount),
                                }),
                            })
                                .then((response) => {
                                    if (response.status === 429) {
                                        TAlert("No enough stock to sell!");
                                    }
                                    setFlagTwo(!flag2);
                                    return;
                                })
                                .catch((error) => {
                                    console.log(
                                        "error occured in selling stock"
                                    );
                                });
                        }
                        flash();
                    });
            };
            getAutoData();
        }, 5000);

        return () => clearInterval(interval);
    });

    const autoTradePart = () => {
        return (
            <div className="autotrade">
                <h3>Auto Trade</h3>
                <div>
                    <input
                        className="amount_input"
                        value={autotrade_amount}
                        onChange={(e) => setAutoTradeAmount(e.target.value)}
                        placeholder="Set an Auto Trade amount"
                    />
                    <button
                        className={
                            flashing ? "algo_stock active" : "algo_stock"
                        }
                        onClick={() => setAutotrading(!autotrading)}
                    >
                        {autotrading ? "Stop AutoTrade" : "Start AutoTrade"}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="papertrading">
            <div className="trading">
                <div className="searchHeader">
                    <h3>ProView PaperTrading</h3>
                </div>
                <div className="overall">
                    <div className="left_side">
                        <div className="left_side_content">{left()}</div>
                    </div>
                    <div className="middle_side">
                        {tradeTag()}

                        <Stock stockSymbol={stock} />
                        {autoTradePart()}
                    </div>
                    <div className="right_side">
                        <div className="right_side_content">
                            <h3> My stock and History</h3>
                            {right()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaperTrading;
