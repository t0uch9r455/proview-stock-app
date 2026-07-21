import React, { useEffect, useState } from "react";
// import "./HistoryTag.css";

function HistoryTag({ stockSymbol, position }) {
    // stockSymbol is an array contains all history

    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [time, setTime] = useState("");
    const [is_buy, setIsBuy] = useState("");
    const [worth, setWorth] = useState("");
    const [cost, setCost] = useState("");

    useEffect(() => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const getData = async () => {
            // if (position === "t") {
            //     setPrice("Avg Price");
            //     setVolume("Volume");
            //     setW52High("52 Week High");
            //     setW52Low("52 Week Low");
            //     setChange("Change");
            //     setLow("Low");
            //     setOpen("Open");
            //     return;
            // }
            // if (!stockSymbol) return;
            if (position === "h") {
                setStock(stockSymbol.stock);
                setAmount(stockSymbol.amount);
                setPrice(parseFloat(stockSymbol.price).toFixed(2));
                setTime(stockSymbol.time);
                setIsBuy(stockSymbol.is_buy.toString());
                // setCost("");
                // setWorth("");
            } else if (position === "hh") {
                setStock("Stock");
                setAmount("Amount");
                setPrice("Price");
                setTime("Time");
                setIsBuy("Is_buy");
                // setCost("");
                // setWorth("");
            } else if (position === "s") {
                setStock(stockSymbol.symbol);
                setAmount(stockSymbol.amount);
                setCost(parseFloat(stockSymbol.cost).toFixed(2));
                const sandboxToken = "Tpk_245594011ed142fca35e0d76758e1d33";
                const sandbox = `https://sandbox.iexapis.com/stable/stock/${stockSymbol.symbol}/price?token=${sandboxToken}`;
                const getWorth = await fetch(sandbox)
                    .then((response) => {
                        if (response.status === 429) {
                            // console.log("here");
                            sleep(200).then(() => getWorth());
                            
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setWorth(
                            parseFloat(data * stockSymbol.amount).toFixed(2)
                        );
                    });

                // setWorth("");
                setPrice("");
                setTime("");
                setIsBuy("");
                // setPrice(stockSymbol.price);
            } else {
                // "sh"
                setStock("Stock");
                setAmount("Amount");
                setCost("Total Cost");
                setWorth("Worth");
                setPrice("");
                setTime("");
                setIsBuy("");
            }
        };
        getData();
    }, [stockSymbol, position]);

    return (
        <div>
            <div className="border_2">
                {position === "hh" || position === "h" ? (
                    <>
                        <span className="st1">{stock}</span>
                        <span className="st3">{amount}</span>
                        <span className="st2">{price}</span>
                        <span className="st4">{is_buy}</span>
                        <span className="st5">{time}</span>
                    </>
                ) : (
                    <>
                        <span className="st1">{stock}</span>
                        <span className="st3">{amount}</span>
                        <span className="st1">{cost}</span>
                        <span className="st1">{worth}</span>
                    </>
                )}
                {/* if s/h show corresponding stuff */}
                {/* <span className="st1">{stock}</span>
                <span className="st3">{amount}</span>
                <span className="st2">{price}</span>
                <span className="st4">{is_buy}</span>
                <span className="st5">{time}</span>
                <span className="st1">{cost}</span>
                <span className="st1">{worth}</span> */}
            </div>
        </div>
    );
}

export default HistoryTag;
