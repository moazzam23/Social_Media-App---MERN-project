import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const User = ({userID, avator, name}) => {
  return (
<Link to={`/user/${userID}`} className='homeUser' >
    <img src={avator}  alt='name'/>
    <Typography>{name}</Typography>

</Link>
  )
}

export default User