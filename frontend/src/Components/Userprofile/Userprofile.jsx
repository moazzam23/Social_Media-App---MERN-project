import React , {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Followuser, GetUserposts, GetUserprofile } from '../../Actions/User';
import Loader from "../Loader/Loader"
import { useAlert } from 'react-alert';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import User from '../User/User';

const Userprofile = () => {
 const {userdata,loading:userloading,error:usererror}= useSelector((state)=>state.Userprofile)
 const {userdata:me}= useSelector((state)=>state.user)
    const { loading, error, posts} = useSelector((state)=>state.Userpost)
    const {error:likeerror,message, loading:deleteloading}= useSelector((state)=>state.Likepost)
    
const alert=useAlert();

const params = useParams()
    const dispatch = useDispatch();
    const [ followers,SetFollowers]= useState(false)
    const [ followering,SetFollowering]= useState(false)
    const [ followeringuser,SetFolloweringuser]= useState(false)
    const [ myprofile  ,SetMyprofile]= useState(false)


    const followhandler=async()=>{ 
        
        SetFolloweringuser(!followeringuser)
    
        await dispatch(Followuser(userdata?._id))
        dispatch(GetUserprofile(params.id));
    }

useEffect(()=>{
    dispatch(GetUserprofile(params.id));
    dispatch(GetUserposts(params.id));

},[dispatch, params.id])

    useEffect(() => {


      if(me?._id === params.id){
        SetMyprofile(true)
      }
      if (userdata) {
        userdata.followers.forEach((item) => {
          if (item._id === me?._id) {
            SetFolloweringuser(true);
          } else {
            SetFolloweringuser(false);
          }
        });
      }


    }, [userdata,dispatch,params.id,me?._id])

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:"ClearError"})
        }
        if(usererror){
            alert.error(usererror)
            dispatch({type:"ClearError"})
        }
        if(message){
            alert.success(message)
            dispatch({type:"ClearMessage"})
        }
        if(likeerror){
            alert.error(likeerror)
            dispatch({type:"ClearError"})
        }
    },[alert,message,usererror,likeerror,error,dispatch])
    

  return  loading===true || userloading===true ? <Loader/> : (
        <div className='account'>
          <div className="accountleft">
  {posts && posts.length > 0 ? (
    posts.map((item) => (
      <Post
        key={item?._id}
        postId={item?._id}
        postcaption={item?.caption}
        postimage={item?.image?.url}
        userId={item?.users?._id}
        userimage={item?.users?.profilepic?.url || 'default_profile_image_url'}
        userName={item?.users?.name}
        likes={item?.likes}
        comments={item?.comments}
      />
    ))
  ) : (
    <Typography variant='h4'>User have no Post to show</Typography>
  )}
</div>

            <div className="accountright">
                <Avatar src={userdata?.profilepic?.url} style={{height:"8vmax" , width:"8vmax"}}/> 
<Typography variant='h5'> {userdata?.name}</Typography>
<div>
    <button>
        <Typography > Posts</Typography>
    </button>
    <Typography variant='h6'> {userdata?.posts.length}</Typography>
</div>
<div>
    <button  disabled={followers.length===0 ?true :false}
    onClick={()=>SetFollowers(!followers)}>
        <Typography > Followers</Typography>
    </button>
    <Typography variant='h6'> {userdata?.followers.length}</Typography>
</div>
<div>
    <button disabled={followering.length===0 ?true :false}
    onClick={()=>SetFollowering(!followering)}>
        <Typography > Followings</Typography>
    </button>
    <Typography variant='h6'> {userdata?.following.length}</Typography>
</div>

{
    myprofile ? null :(
        <Button variant='contained' style={{backgroundColor: followeringuser?"red":"blue"}} 
        disabled={deleteloading}
        onClick={followhandler} >
            { followeringuser ? "Unfollow" : "Follow "}</Button>
    )
}

            </div>

            <Dialog
open={followers}
onClose={()=>SetFollowers(!followers)}
>
<div className='DialogBox'>
    <Typography> Followers</Typography>

    {userdata && userdata?.followers.length > 0 ? (userdata?.followers.map((like)=>(
<User
 key={like?._id}
 userID={like?._id}
 avator={like?.profilepic?.url}
 name={like?.name}
/>)
    )):(
        <Typography style={{display:"flex", alignItems:"center",justifyItems:"center"}}>You have No Followers</Typography>
    )}
</div>
</Dialog>
            <Dialog
open={followering}
onClose={()=>SetFollowering(!followering)}
>
<div className='DialogBox'>
    <Typography> Followings</Typography>

    {userdata && userdata?.following.length > 0 ? (userdata.following.map((like)=>(
 <User
 key={like?._id}
 userID={like?._id}
 avator={like?.profilepic?.url}
 name={like?.name}
/>
) 
    )):(
        <Typography style={{display:"flex", alignItems:"center",justifyItems:"center"}}>You Are Not Following Anyone</Typography>
    )}
</div>
</Dialog>
        </div>
      )
  }

export default Userprofile