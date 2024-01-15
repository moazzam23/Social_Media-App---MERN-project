import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import {Typography, Button, Avatar} from "@mui/material"
import "./Register.css"
import {useDispatch, useSelector} from "react-redux"
import { Registeruser } from '../../Actions/User'
import {useAlert} from "react-alert"
const Register = () => {

    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const[profilepic, setProfilepic]= useState("");
    const[name, setName]= useState("");

    const alert= useAlert();
    const{ error}= useSelector((state)=>state.user)
    const dispatch=useDispatch();

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch({type:"ClearError"})
    }
    },[dispatch,alert,error])


    const handleimagechange=(e)=>{
        const file = e.target.files[0]

        const Reader =new FileReader();
        
        Reader.onload=()=>{
          if(Reader.readyState===2){
            setProfilepic(Reader.result)
          }
        }

        Reader.readAsDataURL(file);
  }

  const handlesubmit=(e)=>{
    e.preventDefault()
    dispatch(Registeruser(name,email,password,profilepic))
  }

  return (
    <div className='register'>
        <form  className='registerForm' onSubmit={handlesubmit}>
        <Typography style={{padding:"2vmax"}} variant='h2' > Social Media App</Typography>
        <Typography style={{padding:"0.5vmax"}} variant='h5' > Create A New Account</Typography>
        <Avatar src={profilepic}  alt="user" sx={{ height:"10vmax", width:"10vmax"}} />
            <input type="file" accept='image/*'  required onChange={handleimagechange} />
            <input type="text" value={name} className='registerInputs' onChange={(e)=>setName(e.target.value)} placeholder='Enter your Name' required />
            <input type="email" value={email} className='registerInputs' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email' required />

            <input type="password" className='registerInputs' autoComplete='true' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Paasword' required />
            <Button type='submit'>
                Register
            </Button>
            <Link to={"/"} >
            <Typography>Already Have A Account?</Typography>
          </Link>
        </form>
    </div>
  )
}

export default Register