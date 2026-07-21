const { User } = require("../models/User");
const { Trade } = require("../models/Trade");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const buyStock = async (req, res) => {
    try {
        console.log("buying stock");
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            console.log("no cookie");
            // redirect to login page
            return res.send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            // console.log("jwt");

            res.status(400).send("No auth");
        }

        const { stock, price, amount } = req.body;
        if (!stock || !price || !amount) {
            res.status(400).send("Need balance, stock, price and amount");
            return;
        }
        console.log(stock);
        console.log(price);
        console.log(amount);

        const trade = await Trade.findOne({ uid: id });
        var stocks = trade.stocks;
        // console.log(stocks);
        // Update Balance
        // console.log(typeof price);
        // console.log(typeof amount);
        var new_balance = trade.balance - price * amount;
        if (new_balance < 0) {
            res.status(404).send("Cannot buy");
            return;
        }

        Trade.findOneAndUpdate(
            { uid: id },
            { $set: { balance: new_balance } },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );

        Trade.findOneAndUpdate(
            { uid: id },
            {
                $push: {
                    history: {
                        is_buy: true,
                        stock: stock.toUpperCase(),
                        price,
                        amount,
                        time: new Date(),
                    },
                },
            },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );

        // Update stock amount
        function isStock(stocks) {
            return stocks.symbol === stock;
        }

        const found = stocks.find(isStock);
        console.log(found);

        //stock is in the array
        if (found != undefined) {
            var new_cost = found.cost + price * amount;
            var new_amount = found.amount + amount;
            // console.log(found.amount);
            // console.log(new_amount);
            Trade.findOneAndUpdate(
                { uid: id },
                {
                    $pull: { stocks: found },
                },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                }
            );
            Trade.findOneAndUpdate(
                { uid: id },
                {
                    $push: {
                        stocks: {
                            symbol: stock,
                            amount: new_amount,
                            cost: new_cost,
                        },
                    },
                },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                }
            );
        } else {
            var new_amount = amount;
            var new_cost = price * amount;
            Trade.findOneAndUpdate(
                { uid: id },
                {
                    $push: {
                        stocks: {
                            symbol: stock.toUpperCase(),
                            amount: new_amount,
                            cost: new_cost,
                        },
                    },
                },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                }
            );
        }

        res.status(200).send("success");
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot buy stock!");
    }
};

const sellStock = async (req, res) => {
    try {
        console.log("sell stock");
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            console.log("no cookie");
            // redirect to login page
            return res.send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            // console.log("jwt");

            res.status(400).send("No auth");
        }

        const { stock, price, amount } = req.body;
        if (!stock || !price || !amount) {
            res.status(400).send("Need balance, stock, price and amount");
            return;
        }

        const trade = await Trade.findOne({ uid: id });
        var stocks = trade.stocks;
        // console.log(stocks);
        // Update Balance
        // console.log(typeof price);
        // console.log(typeof amount);

        var new_balance = trade.balance + price * amount;

        // if stock is in the database, can sell

        function isStock(stocks) {
            return stocks.symbol === stock;
        }

        // if not found, cannot sell
        const found = stocks.find(isStock);
        // console.log(found);

        //stock is in the array
        if (found != undefined) {
            if (found.amount < amount) {
                // cannot sell, 404
                res.status(404).send("no this stock");
                return;
            } else if (found.amount === amount) {
                Trade.findOneAndUpdate(
                    { uid: id },
                    {
                        $pull: { stocks: found },
                    },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        }
                    }
                );
            } else {
                var cost = found.cost;
                var new_amount = found.amount - amount;
                // console.log(found.amount);
                // console.log(new_amount);
                Trade.findOneAndUpdate(
                    { uid: id },
                    {
                        $pull: { stocks: found },
                    },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        }
                    }
                );
                Trade.findOneAndUpdate(
                    { uid: id },
                    {
                        $push: {
                            stocks: {
                                symbol: stock,
                                amount: new_amount,
                                cost: cost,
                            },
                        },
                    },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        }
                    }
                );
            }
        } else {
            res.status(404).send("no this stock");
            return;
        }

        Trade.findOneAndUpdate(
            { uid: id },
            { $set: { balance: new_balance } },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );

        Trade.findOneAndUpdate(
            { uid: id },
            {
                $push: {
                    history: {
                        is_buy: false,
                        stock: stock.toUpperCase(),
                        price,
                        amount,
                        time: new Date(),
                    },
                },
            },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );

        res.status(200).send("success");
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot buy stock!");
    }
};

const getBalance = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            console.log("no cookie");
            // redirect to login page
            return res.send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            res.status(400).send("No auth");
        }

        const trade = await Trade.findOne({ uid: id });
        if (!trade) {
            res.status(404).send("No trade for this user");
        }
        const balance = trade.balance;
        res.status(200).send(JSON.stringify({ balance }));
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot get balance!");
    }
};

const getBought = async (req, res) => {
    try {
        console.log("getting stock");
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            console.log("no cookie");
            // redirect to login page
            return res.send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            res.status(400).send("No auth");
        }

        const trade = await Trade.findOne({ uid: id });
        if (!trade) {
            res.status(404).send("No trade for this user");
        }
        const stocks = trade.stocks;
        console.log(stocks);
        res.status(200).send(JSON.stringify({ stocks }));
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot get stocks!");
    }
};

const getHistory = async (req, res) => {
    try {
        console.log("getting stock");
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            console.log("no cookie");
            // redirect to login page
            return res.send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if (!id) {
            res.status(400).send("No auth");
        }

        const trade = await Trade.findOne({
            uid: id,
        });
        if (!trade) {
            res.status(404).send("No trade for this user");
        }
        const history = trade.history.reverse();
        // console.log(history);
        res.status(200).send(JSON.stringify({ history }));
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot get stocks!");
    }
};

module.exports = { buyStock, sellStock, getBalance, getBought, getHistory };
