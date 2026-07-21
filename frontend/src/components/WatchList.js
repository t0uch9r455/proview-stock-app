import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Stock from "./Stock";
import TAlert from "./alert";

function WatchList() {
    const [watchList, setWatchList] = useState([]);
    const [stockname, setStockname] = useState("");
    const [currentStock, setCurrentStock] = useState("");

    useEffect(() => {
        getList();
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
                    setWatchList(data.list);
                    console.log(watchList);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    const handleDeletePersonalWatchlist = (stockname) => {
        setStockname(stockname);
        fetch("http://localhost:5050/api/deleteWatchList", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stockname }),
        })
            .then((response) => {
                console.log("success");
                getList();
                return;
                // return response.json();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="frds">
            <div className="watchlistheader">
                <h3>Watch List</h3>
            </div>
            <div className="watchlist">
                {watchList.map((item) => {
                    return (
                        <div
                            key={item}
                            className="container"
                            // target="_blank"
                            // href={"https://finance.yahoo.com/quote/" + item}
                        >
                            <span>
                                {item}
                                <br />
                            </span>
                            <Button
                                className="deleteFromWatchList"
                                type="button"
                                onClick={() =>
                                    handleDeletePersonalWatchlist(item)
                                }
                            >
                                delete
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WatchList;
