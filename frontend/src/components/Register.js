import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import TAlert from "./alert";
import { ToastContainer } from "react-toastify";
import hpi from "./images/Homepage_image.jpg";

import "./Register.css";

const theme = createTheme();

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerbutton = (e) => {
        if (email === "") {
            TAlert("Please Input email");
            return;
        }
        if (username === "") {
            TAlert("Please Input username");
            return;
        }
        if (password === "") {
            TAlert("Please Input password");
            return;
        }
        fetch("http://localhost:5050/api/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => {
                if (response.status === 400) {
                    TAlert("Please use correct information!");
                }
                return response.json();
            })
            .then((data) => {
                if (data.name) {
                    navigate("/home");
                }
            })
            .catch((error) => {
                console.log("error occured in fetch");
            });
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <img src={hpi} alt="home_image" className="Login-img" />
            <Grid
                item
                md={4}
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
                        Register
                    </Typography>
                    <Box
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                        />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="button"
                            onClick={registerbutton}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Register An Account
                        </Button>
                        <ToastContainer />
                        <Button
                            type="button"
                            onClick={() => navigate("/login")}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Register;
