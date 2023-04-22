import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useState, react, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { URL } from "../constants/userConstants";
import { login } from "../actions/userAction";

export const Login = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate.push("/");
    }
  }, [user, isAuthenticated]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const formdata = { email: email, password: password };
    dispatch(login(formdata));
  };
  return (
    <>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: "1vw" }} />
        PU Results
      </div>

      <div className="register">
        <Paper style={{ padding: "2vh 2vw" }}>
          <h5>LOG IN & PLAY</h5>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                width: "50%",
                marginRight: "1vw",
              }}
            >
              Facebook
            </Button>
            <Button
              variant="contained"
              elevation="2"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                width: "50%",
              }}
            >
              Google
            </Button>
          </div>
          <form onSubmit={handlesubmit} className="loginform">
            <TextField
              id="fullWidth"
              defaultValue="Hello World"
              variant="standard"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <TextField
              id="fullWidth"
              defaultValue="Hello World"
              variant="standard"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="itseveryday"
              variant="contained"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Log in
            </Button>
          </form>
          Forgot Password
          <Link href="/register">Dont have a account?Sign up</Link>
        </Paper>
      </div>
    </>
  );
};

export default Login;
