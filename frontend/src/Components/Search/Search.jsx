import React, { useState } from 'react'
import "./Search.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Alluser } from '../../Actions/User'
import User from '../User/User'

const Search = () => {

  const {userdata, loading}= useSelector((state)=>state.Alluser);
  const dispatch = useDispatch();
  const [name,setName]=useState("")

  const handlesubmit=(e)=>{
        e.preventDefault();
        dispatch(Alluser(name))
  }

  return (
    <div className='search'>
    <form  className='searchForm' onSubmit={handlesubmit}>
    <Typography style={{padding:"2vmax"}} variant='h2' > Social Media App</Typography>
        <input type="text" value={name} className='searchInputs' onChange={(e)=>setName(e.target.value)} placeholder='Enter your Name' required />
       
        <Button disabled={loading} type='submit'>
           Search
        </Button>


<div className='searchResults'> 
{userdata && userdata.map((user)=>(
  <User 
  key={user._id}
  userID={user._id}
  avator={user.profilepic.url}
  name={user.name}
  />
))}

</div>

    </form>
 </div>
  )
}

export default Search