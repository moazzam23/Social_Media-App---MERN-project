import axios from "axios"

export const getlikeanddislikepost= (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LikeRequest",
        })
    
        const {data}= await axios.get(`/api/v1/createpost/${id}`)
        dispatch({
            type:"LikeSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:'LikeFailure',
            payload:error.response.data.message,
        })
    }
}

export const Getcommnetpost= (id,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"CommentRequest",
        })
    
        const {data}= await axios.put(`/api/v1/posts/comment/${id}`,{comment},{headers:{
            "Content-Type":'application/json',
        }})
        dispatch({
            type:"CommentSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"CommetFailure",
            payload:error.response.data.message,
        })
    }
}

export const deletecommnetpost= (id,commentId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteCommentRequest",
        })
    
        const {data}= await axios.delete(`/api/v1/posts/comment/${id}`,{data:{commentId}});
        dispatch({
            type:"deleteCommentSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"deleteCommetFailure",
            payload:error.response.data.message,
        })
    }
}

export const CreateNewPost= (image,caption)=>async(dispatch)=>{
    try {
        dispatch({
            type:"NewpostRequest",
        })
    const {data} = await axios.post("/api/v1/createpost",{image,caption},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"NewpostSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"NewpostFailure",
            payload:error.response.data.message,
        })
    }
}


export const UpdatePost= (caption,id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdatepostRequest",
        })
    
        const {data}= await axios.put(`/api/v1/createpost/${id}`,{caption},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UpdatepostSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"UpdatepostFailure",
            payload:error.response.data.message,
        })
    }
}


export const DeletePost= (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"DeletepostRequest",
        })
    
        const {data}= await axios.delete(`/api/v1/createpost/${id}`)
        dispatch({
            type:"DeletepostSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"DeletepostFailure",
            payload:error.response.data.message,
        })
    }
}

export const UpdateProfile= (name,email,profilepic)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateProfileRequest",
        })
    
        const {data}= await axios.put("/api/v1/update_profile",{name,email,profilepic},{headers:{
            "Content-Type":'application/json',
        }})
        dispatch({
            type:"UpdateProfileSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"UpdateProfileFailure",
            payload:error.response.data.message,
        })
    }
}