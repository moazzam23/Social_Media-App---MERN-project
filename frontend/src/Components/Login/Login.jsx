import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser, Loginuser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {message}= useSelector((state)=>state.user)
  const dispatch = useDispatch();
const alert = useAlert();

  useEffect(()=>{
    if(message){
        alert.success(message)
        dispatch({type:"ClearError"})
    }
   
},[alert,message,dispatch])


  const loginhandler = async (e) => {
    e.preventDefault();

    await dispatch(Loginuser(email, password));
    dispatch(LoadUser());
  };

  return (
    <div className="login">
      <form onSubmit={loginhandler} className="loginForm">
        <Typography style={{ padding: "2vmax" }} variant="h2">
          Social Media Login
        </Typography>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
        <input
          type="password"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Paasword"
          required
        />
        <Link to={"/forgot/password"}>
          <Typography>Forgot Password?</Typography>``
        </Link>
        <Button type="submit">login</Button>
        <Link to={"/register"} style={{ marginTop: "-15px" }}>
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
