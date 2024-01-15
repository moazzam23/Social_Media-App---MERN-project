import React, { useState , useEffect } from 'react'
import "./Newpost.css"
import { Button, Typography } from '@mui/material'
import {useDispatch, useSelector} from "react-redux"
import { CreateNewPost } from '../../Actions/Post'
import { useAlert } from 'react-alert'
import { LoadUser } from '../../Actions/User'

const Newpost = () => {
  
const [image , setImage]= useState(null)
const [caption , setCaption]= useState("")
const dispatch = useDispatch();

const { error ,loading,message} =useSelector((state=>state.Likepost))

  
  const alert = useAlert();
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch({type:"ClearError"})
  }
  if(message){
      alert.success(message)
      dispatch({type:"ClearMessage"})
  }
  }, [error,message,dispatch,alert])
  

  const handleimagechange=(e)=>{
        const file = e.target.files[0]

        const Reader =new FileReader();
        
        Reader.onload=()=>{
          if(Reader.readyState===2){
            setImage(Reader.result)
          }
        }

        Reader.readAsDataURL(file);
  }

  const handlesubmit= async (e)=>{
    e.preventDefault()
   await dispatch(CreateNewPost(image,caption))
    dispatch(LoadUser())

  }
  return (
    <div className='newPost'>
        <form className='newPostForm' onSubmit={handlesubmit}>
            <Typography variant='h4'> Create New Post </Typography>
            {image && <img src={image} alt='pic' />}
            <input type="file"  accept='image/*'  onChange={handleimagechange} />
            <input type="text" placeholder='Caption...'  value={caption} onChange={(e)=> setCaption(e.target.value)}/>
            <Button  disabled={loading} type='submit'> Post</Button>
        </form>
    </div>
  )
}

export default Newpost