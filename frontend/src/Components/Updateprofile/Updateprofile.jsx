import React, { useEffect, useState } from 'react'
import {Typography, Button, Avatar} from "@mui/material"
import "./Updateprofile.css"
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from "react-alert"
import { UpdateProfile } from '../../Actions/Post'
import Loader from '../Loader/Loader'
import { LoadUser } from '../../Actions/User'
const Updateprofile = () => {

    const{loading ,userdata, error}= useSelector((state)=>state.user)
   const {loading:updateloading,error:updateerror,message}= useSelector((state)=>state.Likepost)
    const[email, setEmail]= useState(userdata?.email);
    const[profilepic, setProfilepic]= useState("");
    const[profilepicprev, setProfilepicprev]= useState(userdata?.profilepic.url);
    const[name, setName]= useState(userdata?.name);

    const alert= useAlert();
    const dispatch=useDispatch();

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch({type:"clearerror"})
    }
      if(updateerror){
        alert.error(updateerror)
        dispatch({type:"ClearError"})
    }
      if(message){
        alert.success(message)
        dispatch({type:"ClearMessage"})
    }
    },[dispatch,alert,error,updateerror,message])


    const handleimagechange=(e)=>{
        const file = e.target.files[0]

        const Reader =new FileReader();
        
        Reader.onload=()=>{
          if(Reader.readyState===2){
            setProfilepic(Reader.result)
            setProfilepicprev(Reader.result)
          }
        }

        Reader.readAsDataURL(file);
  }

  const handlesubmit= async(e)=>{
    e.preventDefault()
   await dispatch(UpdateProfile(name,email,profilepic))
    dispatch(LoadUser())
  }

  return (
   loading ? <Loader/> : ( <div className='updateProfile'>
   <form  className='updateProfileForm' onSubmit={handlesubmit}>
   <Typography style={{padding:"2vmax"}} variant='h2' > Social Media App</Typography>
   <Typography style={{padding:"0.5vmax"}} variant='h5' > Update Your Profile</Typography>
   <Avatar src={profilepicprev}  alt="user" sx={{ height:"10vmax", width:"10vmax"}} />
       <input type="file" accept='image/*'  required onChange={handleimagechange} />
       <input type="text" value={name} className='updateProfileInputs' onChange={(e)=>setName(e.target.value)} placeholder='Enter your Name' required />
       <input type="email" value={email} className='updateProfileInputs' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email' required />

       <Button disabled={updateloading} type='submit'>
           Update
       </Button>
   </form>
</div>
)
  )
}

export default Updateprofile