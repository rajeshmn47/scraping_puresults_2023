import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { useState, react } from "react";
import { URL } from "../constants/userConstants";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log(phonenumber, URL, email, password);
    const data = await axios.post(`${URL}/auth/register`, {
      username: "username",
      email: email,
      phonenumber: phonenumber,
      password: password,
    });
    console.log(data);
    if (data?.data?.token) {
      setOpen("registered successfully");
    } else {
      setOpen(data?.data?.message);
    }
  };

  return (
    <>
      <div className="registertopbar">
        <ArrowBackIcon
          style={{ marginRight: "2vw" }}
          onClick={() => navigate(-1)}
        />
        register & check
      </div>

      <div className="register">
        <Paper style={{ padding: "10px 10px" }}>
          <form onSubmit={handlesubmit} className="registerform">
            <TextField
              placeholder="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              placeholder="Phonenumber"
              variant="standard"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              type="phone"
            />
            <TextField
              placeholder="Password"
              variant="standard"
              id="fullWidth"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Register
            </Button>
          </form>
          {open ? <p style={{ color: "red" }}>{open}</p> : null}
          forgot password
        </Paper>
        <Link href="/login">Aleady a user?Log in</Link>
      </div>
    </>
  );
};

export default Register;
