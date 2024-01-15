import React from 'react'
import "./Home.css"
import { Typography } from '@mui/material'
import User from '../User/User'
import Post from '../Post/Post'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from "react-alert"
import { postoffollowinguser,Alluser } from '../../Actions/User'
import Loader from '../Loader/Loader'

const Home = () => {
    const dispatch= useDispatch();

    const{loading, postnew, error}=useSelector((state)=>state.postoffolllowing);
    const {userdata, loading:userdataLoading}= useSelector((state)=>state.Alluser)


    useEffect(()=>{ 
        dispatch(postoffollowinguser())
        dispatch(Alluser())
    },[dispatch])

    const {error:likeerror,message}= useSelector((state)=>state.Likepost)
    const alert=useAlert();
useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch({type:"ClearError"})
    }
    if(likeerror){
        alert.error(likeerror)
        dispatch({type:"ClearError"})
    }
    if(message){
        alert.success(message)
        dispatch({type:"ClearMessage"})
    }
},[alert,message,likeerror,error,dispatch])


    return  loading===true || userdataLoading===true ? (<Loader/>) : (
    <div className='home'>
    <div className="homeleft">
      {postnew && postnew.length > 0 ? ( postnew.map((item)=>(
  <Post
  key={item._id}
  postId={item._id}
  postcaption={item.caption} 
  postimage={item.image.url}
  userId={item.users._id}
  userimage={item.users.profilepic.url}
  userName={item.users.name}
  likes={item.likes}
  comments={item.comments}
/>
      ))):(
        <Typography  variant='h4'>No Post to show</Typography>
      )}
      
        </div>
        <div className="homeright">
    { userdata && userdata.length > 0 ? (userdata.map((user)=>(
  <User 
  key={user._id}
  userID={user._id}
  avator={user.profilepic.url}
  name={user.name}
  />
   ) )):(
      <Typography>No User Data Found</Typography>
    )}
        </div>
</div>
  )
  
}

export default Home