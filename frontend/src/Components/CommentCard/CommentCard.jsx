import React from 'react'
import "./CommentCard.css"
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deletecommnetpost } from '../../Actions/Post'
import { GetMyposts, postoffollowinguser } from '../../Actions/User'

const CommentCard = ({
    userId,
    name,
    picture,
    comment,
    commentId,
    postId,
    IsAccount,
}) => {

const dispatch=useDispatch();
    const {userdata}= useSelector(state=>state.user)
  
    const deletehandler=()=>{
dispatch(deletecommnetpost(postId,commentId))
if(IsAccount){
    dispatch(GetMyposts())
}else{

    dispatch(postoffollowinguser())
}    
}
  
    return (
    <div className="commentUser">
<Link to={`/user/${userId}`} >
    <img src={picture} alt='pic' />
    <Typography style={{minWidth:"6wmax"}}>{name}</Typography>
</Link>

<Typography style={{paddingLeft:"5vw"}}>{comment}</Typography>

{
   IsAccount ? ( <Button onClick={deletehandler}>
    <Delete/>
</Button>) :  userId === userdata._id ?( <Button onClick={deletehandler}>
    <Delete/>
</Button>): null
}


    </div>
  )
}

export default CommentCard