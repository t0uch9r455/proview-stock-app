import React, { useEffect, useState } from "react";
import "./StockTag.css";

function StockTag({ stockSymbol, position }) {
    const [color, setColor] = useState(true);
    const [price, setPrice] = useState("");
    const [volume, setVolume] = useState("");
    const [w52High, setW52High] = useState("");
    const [w52Low, setW52Low] = useState("");
    const [open, setOpen] = useState("");
    const [low, setLow] = useState("");
    const [change, setChange] = useState("");

    useEffect(() => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const getData = async () => {
            if (position === "t") {
                setPrice("Avg Price");
                setVolume("Volume");
                setW52High("52 Week High");
                setW52Low("52 Week Low");
                setChange("Change");
                setLow("Low");
                setOpen("Open");
                return;
            }
            if (!stockSymbol) return;
            const sandbox = `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/batch?types=quote&last=1&token=Tpk_245594011ed142fca35e0d76758e1d33`;
            try {
                const response = await fetch(sandbox)
                    .then((response) => {
                        console.log(response.status);
                        if (response.status === 429) {
                            sleep(500).then(() => getData(stockSymbol));
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // console.log(data);
                        // if (position === "a") {
                        const quote = data.quote;
                        // console.log(quote);
                        // price, volume, week52High, week52Low
                        // if(quote.price >= price)
                        setPrice(quote.latestPrice);
                        setVolume(quote.latestVolume);
                        setW52High(quote.week52High);
                        setW52Low(quote.week52Low);
                        setChange(quote.change);
                        setLow(quote.low);
                        setOpen(quote.open);
                        // } else {
                        // === 1
                        // }
                        // set up information
                    });
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [stockSymbol]);

    return (
        <div>
            {price === "" || price === null ? (
                <div className="nothing"> </div>
            ) : (
                <div className="border_2">
                    <span className="st77">{stockSymbol}</span>
                    <span className="st77">{price}</span>
                    <span className="st77">{volume}</span>
                    <span className="st77">{w52High}</span>
                    <span className="st77">{w52Low}</span>
                    <span className="st77">{change}</span>
                    <span className="st77">{low}</span>
                    <span className="st77">{open}</span>
                </div>
            )}
        </div>
    );
}

export default StockTag;
