import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import "./Stock.css";

function Stock({ stockSymbol }) {
    // const KEYS = ["THN5ITBH3LFSAWLV", "V59N2LFKMSXQWONN"];
    //date
    const [stockChartXValues, setStockChartXValues] = useState([]);
    //close
    const [stockChartYValues, setStockChartYValues] = useState([]);
    const [stockChartHigh, setStockChartHigh] = useState([]);
    const [stockChartOpen, setStockChartOpen] = useState([]);
    const [stockChartLow, setStockChartLow] = useState([]);

    // const [index, setIndex] = useState([]);

    useEffect(() => {
        setStockChartXValues([]);
        setStockChartYValues([]);
        setStockChartHigh([]);
        setStockChartOpen([]);
        setStockChartLow([]);
        // console.log(stockSymbol);
        getStockRequest(stockSymbol);
    }, [stockSymbol]);
    // const [StockSymbol, setStockSymbol] = useState("FB");

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //const StockSymbol = "GOOG";
    const API_KEY = "V59N2LFKMSXQWONN";
    const sandboxToken = "Tpk_245594011ed142fca35e0d76758e1d33";
    const realToken = "pk_0e6314b0afd047f3bb2da2517debc3a0";
    //url = `https://sandbox.iexapis.com/stable/stock/AAPL/time-series/?token=Tpk_245594011ed142fca35e0d76758e1d33`

    // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

    const getStockRequest = async (stockSymbol) => {
        if (!stockSymbol) return;
        const real = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/chart/3m?token=${realToken}`;
        const sandbox = `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/chart/3m?token=${sandboxToken}`;
        // back off function
        const response = await fetch(sandbox, {
            retryDelay: function (attempt) {
                return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
            },
        })
            .then((response) => {
                // console.log(response.status);
                // console.log(response);
                if (response.status === 429) {
                    // console.log("here");
                    sleep(200).then(() => getStockRequest(stockSymbol));
                    // return;
                }
                return response.json();
            })
            .then((data) => {
                setStockChartXValues([]);
                setStockChartYValues([]);
                setStockChartHigh([]);
                setStockChartOpen([]);
                setStockChartLow([]);
                for (const key in data) {
                    console.log(data[key]);
                    console.log(data[key]["date"]);
                    console.log(data[key]["high"]);
                    console.log(data[key]["low"]);
                    console.log(data[key]["open"]);

                    setStockChartXValues((stockChartXValues) => [
                        ...stockChartXValues,
                        data[key]["date"],
                    ]);
                    setStockChartYValues((stockChartYValues) => [
                        ...stockChartYValues,
                        data[key]["close"],
                    ]);
                    setStockChartHigh((stockChartHigh) => [
                        ...stockChartHigh,
                        data[key]["high"],
                    ]);
                    setStockChartOpen((stockChartOpen) => [
                        ...stockChartOpen,
                        data[key]["open"],
                    ]);
                    setStockChartLow((stockChartLow) => [
                        ...stockChartLow,
                        data[key]["low"],
                    ]);
                }
            });
    };

    stockChartXValues.slice(-1);

    var trace1 = {
        x: stockChartXValues,

        close: stockChartYValues,

        decreasing: { line: { color: "#FF0000" } },

        high: stockChartHigh,

        increasing: { line: { color: "#00d719" } },

        line: { color: "#00d719" },

        low: stockChartLow,

        open: stockChartOpen,

        type: "candlestick",
        xaxis: "x",
        yaxis: "y",
    };

    var data = [trace1];

    var layout = {
        plot_bgcolor: "#f3f4f6",
        paper_bgcolor: "#f3f4f6",
        dragmode: "zoom",
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60,
        },
        showlegend: false,
        xaxis: {
            autorange: true,
            rangeslider: { range: ["2022-05-17 12:00", "2022-8-10 12:00"] },
            title: "Date",
            type: "date",
        },
        yaxis: {
            autorange: true,
            type: "linear",
        },
        // width: 720,
        // height: 500,

        //   annotations: [
        //     {
        //       x: '2017-01-31',
        //       y: 0.9,
        //       xref: 'x',
        //       yref: 'paper',
        //       text: 'largest movement',
        //       font: {color: 'magenta'},
        //       showarrow: true,
        //       xanchor: 'right',
        //       ax: -20,
        //       ay: 0
        //     }
        //   ],

        //   shapes: [
        //       {
        //           type: 'rect',
        //           xref: 'x',
        //           yref: 'paper',
        //           x0: '2022-01-31',
        //           y0: 0,
        //           x1: '2022-02-01',
        //           y1: 1,
        //           fillcolor: '#d3d3d3',
        //           opacity: 0.2,
        //           line: {
        //               width: 0
        //           }
        //       }
        //     ]
    };

    // Plotly.newPlot('myDiv', data, layout);

    // setTimeout('getStockRequest', 1000);
    return (
        <div className="stock">
            <h4>{stockSymbol}</h4>

            <Plot className="stockPlot" data={data} layout={layout} />

            {/* 
            <div className="plot">
            <Plot
                className="stockPlot"
                data={[
                    {
                        x: stockChartXValues,
                        y: stockChartYValues,
                        type: "candlestick",
                        // mode: "lines+markers",
                        marker: { color: "#00ac14" },
                    },
                ]}
                layout={{
                    width: 720,
                    height: 500,
                    title: { stockSymbol },
                    plot_bgcolor: "#f3f4f6",
                    paper_bgcolor: "#f3f4f6",
                    xaxis: { title: "TIME" },
                    yaxis: { title: "COST" },
                }}
            />
            </div> */}
        </div>
    );
}

export default Stock;
