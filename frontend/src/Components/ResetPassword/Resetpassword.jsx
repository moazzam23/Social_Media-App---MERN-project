import React, { useEffect, useState } from 'react'
import "./Resetpassword.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { ResetPassword } from '../../Actions/User'

const Resetpassword = () => {
    const [newpassword, setNewPassword] = useState("");

    const { message,error}=useSelector((state)=>state.Likepost)

    const dispatch= useDispatch();
    const alert=useAlert();
    const params=useParams()
;
    const resetpasswordhandler=(e)=>{
        e.preventDefault();
        dispatch(ResetPassword(params.token,newpassword))

    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:"ClearError"})
        }
       
        if(message){
            alert.success(message)
            dispatch({type:"ClearMessage"})
        }
    },[alert,message,error,dispatch])

  return (
    <div className="resetPassword">
    <form onSubmit={resetpasswordhandler} className="resetPasswordForm">
      <Typography style={{ padding: "2vmax" }} variant="h4">
        Enter New Password
      </Typography>
     
      <input
        type="password"
        autoComplete="true"
        className="resetPasswordInputs"
        value={newpassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter New Password"
        required
      />

      <Link to={"/"}>
      <Typography>
        Login?
      </Typography>
      </Link>
      <Typography>OR</Typography>
      <Link to={"/forgot/password"}>
      <Typography>
        Request Another Token?
      </Typography>
      </Link>

      <Button  type="submit"> Reset </Button>
    </form>
  </div>
  )
}

export default Resetpassword