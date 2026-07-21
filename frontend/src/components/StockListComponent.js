import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import "./StockListComponent.css";

function StockListComponent() {
    const [stockHotlist, setStockHotlist] = useState([]);

    // const [StockSymbol, setStockSymbol] = useState("FB");

    const API_KEY = "THN5ITBH3LFSAWLV";

    // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;
    //https://www.yahoofinanceapi.com/
    //mqGwUbeB2K1t2FFNFFXaV8mXEPBry3hX7rGo1R0n

    const getStockHotlist = async () => {
        const check1 = localStorage.getItem("stockHotlist");

        // var axios = require("axios").default;

        // var options = {
        //   method: "GET",
        //   url: "https://yfapi.net/v11/finance/quoteSummary/AAPL",
        //   params: { modules: "defaultKeyStatistics,assetProfile" },
        //   headers: {
        //     "x-api-key": "RIFrduAEmH4ZWA5CdBpylaV31kKt8wUT2stzO3cs",
        //   },
        // };

        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });

        //--------------------------------------------//
        if (check1 !== null) {
            setStockHotlist([]);
            for (const key in JSON.parse(check1)) {
                setStockHotlist((stockHotlist) => [
                    ...stockHotlist,
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
                    // ZHITAO
                    // "x-api-key": "fHFncNPNkBav6MzqUJiUF6cpAVLBfWWi9MCpqPyR",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    // console.log(
                    //     response.data["finance"]["result"][0]["quotes"]
                    // );
                    // console.log(response.data);

                    localStorage.setItem(
                        "stockHotlist",
                        JSON.stringify(
                            response.data["finance"]["result"][0]["quotes"]
                        )
                    );
                    // setStockHotlist([]);
                    setStockHotlist(
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

    useEffect(() => {
        getStockHotlist();
    }, []);

    return (
        <div className="whole">
            <div className="hotHeader">
                <h3> HotLists</h3>
            </div>
            <div className="grid-container">
                {stockHotlist.map((item) => {
                    return (
                        <a
                            key={item}
                            target="_blank"
                            href={"https://finance.yahoo.com/quote/" + item}
                        >
                            <span>{item}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default StockListComponent;
