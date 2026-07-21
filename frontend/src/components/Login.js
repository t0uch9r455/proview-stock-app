import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import hpi from "./images/Homepage_image.jpg";

import TAlert from "./alert";
import { ToastContainer } from "react-toastify";

import "./Login.css";

const theme = createTheme();

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    fetch("http://localhost:5050/api/profile", {
        method: "GET",
        credentials: "include",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.name) {
                navigate("/home");
            }
        })
        .catch((error) => {
            console.log("login needed");
        });

    const loginbutton = (e) => {
        if (email === "") {
            TAlert("Please Input email");
            return;
        }
        if (password === "") {
            TAlert("Please Input password");
            return;
        }
        fetch("http://localhost:5050/api/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.status === 400) {
                    TAlert("Please use correct information!");
                }
                return response.json();
            })
            .then((data) => {
                if (data.name) {
                    console.log("navigate to stock");
                    navigate("/home");
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <img src={hpi} alt="home_image" className="Login-img" />
            <Grid
                item
                component={Paper}
                square
            >
                <Box
                    sx={{
                        my: 15,
                        mx: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                        />
                        <Button
                            type="button"
                            onClick={loginbutton}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Login In
                        </Button>
                        <ToastContainer />
                        <Button
                            type="button"
                            onClick={() => navigate("/reset")}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Reset Password
                        </Button>
                        <Button
                            type="button"
                            onClick={() => navigate("/register")}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Back to Register
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;
