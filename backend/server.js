// set up dependencies
const express = require("express");
const database_connect = require("./db/connect");
// const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRouter");

const msgRouter = require("./routes/msgRouter");
const groupRouter = require("./routes/groupRouter");
const stockRouter = require("./routes/stockRouter");
const profileRouter = require("./routes/profileRouter");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");

const http = require("http");
const cors = require("cors");

const mongoose = require("mongoose");

// set up port
const port = process.env.PORT;

// set up app
const app = express();

server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

// routers
app.use("/api/", authRouter);
app.use("/api/", stockRouter);

app.use("/api/", msgRouter);
app.use("/api/", groupRouter);

app.use("/api/", stockRouter);

app.use("/api/", profileRouter);

// set up error
app.use(notFound);
// app.use(errorHandlerMiddleware);

// set up server
const start = async () => {
    try {
        // connect mongodb database
        await database_connect(process.env.PRO_VIEW_URI);

        server.listen(port, () =>
            console.log(`Server is listening port ${port}...`)
        );

        // app.listen(port, () =>
        //     console.log(`Server is listening port ${port}...`)
        // );
    } catch (error) {
        console.log(error);
    }
};

start();
