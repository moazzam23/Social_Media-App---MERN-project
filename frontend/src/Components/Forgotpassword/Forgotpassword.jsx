import { Typography , Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Forgotpassword.css"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { ForgotPassword } from '../../Actions/User'

const Forgotpassword = () => {
    const [email, setEmail]= useState("")

    const {error,message, loading}= useSelector((state)=>state.Likepost)

const dispatch = useDispatch();
const alert=useAlert();


    const forgothandler=(e)=>{
      e.preventDefault()
dispatch(ForgotPassword(email));
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
<div className="forgotPassword">
      <form onSubmit={forgothandler} className="forgotPasswordForm">
        <Typography style={{ padding: "2vmax" }} variant="h2">
          Social Media 
        </Typography>
        <input
          type="email"
          value={email}
          className='forgotPasswordInputs'
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
       
        <Button disabled={loading} type="submit">Send Email</Button>
       
      </form>
    </div>
  )
}

export default Forgotpassword