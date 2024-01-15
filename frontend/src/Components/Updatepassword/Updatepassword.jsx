import "./updatepassword.css";
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { UpdatePassword } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const Updatepassword = () => {

    const {loading,error,message}= useSelector((state)=>state.Likepost)
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const dispatch= useDispatch();
  const alert=useAlert();

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch({type:"ClearError"})
  }
   
    if(message){
      alert.success(message)
      dispatch({type:"ClearMessage"})
  }
  },[dispatch,alert,error,message])

  const updatehandler = (e) => {
    e.preventDefault();
    dispatch(UpdatePassword(oldpassword,newpassword));
  };

  return (
    loading ? <Loader/> :(
        <div className="updatePassword">
        <form onSubmit={updatehandler} className="updatePasswordForm">
          <Typography style={{ padding: "2vmax" }} variant="h4">
            Update Password
          </Typography>
          <input
            type="password"
            autoComplete="true"
            className="updatePasswordInputs"
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter Your Old Paasword"
            required
          />
          <input
            type="password"
            autoComplete="true"
            className="updatePasswordInputs"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter Your New Password"
            required
          />
  
          <Button  disabled={loading} type="submit">Update</Button>
        </form>
      </div>
    ) 
  );
};

export default Updatepassword;
