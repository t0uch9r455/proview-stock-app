import { React, useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Search_page.css";

import Sidebar from "./Sidebar";
import Stock from "./Stock";
import TAlert from "./alert";
import Clock from "./Clock";

import { ToastContainer } from "react-toastify";
function Search_page() {
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [stockname, setStockname] = useState("");
    const handleSearch = () => {
        if (input === "") {
            TAlert("Input is invalid!");
            return;
        }
        setSearch(input);
    };
    const handlePersonalWatchList = () => {
        if (input === "") {
            TAlert("Input is invalid!");
            return;
        }
        setStockname(input);
        fetch("http://localhost:5050/api/addWatchList", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stockname: input }),
        })
            .then((response) => {
                console.log("success");
                return;
                // return response.json();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="flex_container">
            <div className="search_component">
                <div className="searchHeader">
                    <Clock></Clock>
                </div>
                <div className="search">
                    <div className="input">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            label="Please type a Stock Name!"
                            sx={{
                                width: "100%",
                                alignItems: "center",
                            }}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            className="searchButton"
                            type="button"
                            onClick={handleSearch}
                            variant="contained"
                            fullWidth
                            // sx={{ mt: 3, mb: 2 }}
                        >
                            Search
                        </Button>
                        <Button
                            className="personalWatchList"
                            type="button"
                            onClick={handlePersonalWatchList}
                            variant="contained"
                            fullWidth
                            // sx={{ mt: 3, mb: 2 }}
                        >
                            add to personal watch list
                        </Button>
                        <ToastContainer />
                    </div>
                    <Stock stockSymbol={search} />
                </div>
            </div>
        </div>
    );
}

export default Search_page;
