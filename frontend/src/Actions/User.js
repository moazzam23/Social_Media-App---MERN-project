
import axios from "axios";

export const Loginuser=(email,password)=> async(dispatch)=>{
try {
    
dispatch({
    type:"Loginrequest"
})

const {data}= await axios.post("/api/v1/login",{email,password},{ headers:{
"Content-Type":"application/json",
}})

dispatch({
    type:"Loginsuccess",
    payload:data.user
})

} catch (error) {
    dispatch({
        type:"Loginfailure",
        payload:error,
    })
    
}
}
export const LoadUser=()=> async(dispatch)=>{
try {
    
dispatch({
    type:"Loaduserrequest"
})

const {data}= await axios.get("/api/v1/myprofile")

dispatch({
    type:"Loadusersuccess",
    payload:data.userdata
})

} catch (error) {
    dispatch({
        type:"Loaduserfailure",
        payload:error.response.data.message,
    })
}
}

export const postoffollowinguser=()=>async(dispatch)=>{
try {


    dispatch({
        type:"postoffollowingRequest",

    })

    const {data}= await axios.get("/api/v1/posts")

    dispatch({
        type:"postoffollowingSuccess",
        payload:data.postnew,
    })

    
} catch (error) {
    dispatch({
        type:"postoffollowingFaliure",
        payload:error.response.data.message,
    })
}
}

export const GetMyposts=()=>async(dispatch)=>{
try {


    dispatch({
        type:"MypostsRequest",

    })

    const {data}= await axios.get("/api/v1/myposts")

    dispatch({
        type:"MypostsSuccess",
        payload:data.posts,
    })

    
} catch (error) {
    dispatch({
        type:"MypostsFaliure",
        payload:error.response.data.message,
    })
}
}

export const Alluser=(name="")=>async(dispatch)=>{
    try {
    
    
        dispatch({
            type:"AlluserRequest",
    
        })
    
        const {data}= await axios.get(`/api/v1/users?name=${name}`)
    
        dispatch({
            type:"AlluserSuccess",
            payload:data.userdata,
        })
    
        
    } catch (error) {
        dispatch({
            type:"AlluserFailure",
            payload:error.response.data.message,
        })
    }
}

export const Logoutuser=()=> async(dispatch)=>{
    try {
        
    dispatch({
        type:"Logoutuserrequest"
    })
    
 await axios.get("/api/v1/logout")
    
    dispatch({
        type:"Logoutuserrsuccess",
    })
    
    } catch (error) {
        dispatch({
            type:"Logoutuserfailure",
            payload: error.response.data.message,
        })
        
    }
    }

    export const Registeruser=(name,email,password,profilepic)=> async(dispatch)=>{
        try {
            
        dispatch({
            type:"RegisterRequest"
        })
        
        const {data}= await axios.post("/api/v1/register",{name,email,password,profilepic},{ headers:{
        "Content-Type":"application/json",
        }})
        
        dispatch({
            type:"Registersuccess",
            payload:data.user,
        })
        
        } catch (error) {
            dispatch({
                type:"Registerfailure",
                payload: error.response.data.message,
            })
            
        }
        }    

        export const UpdatePassword= (oldpassword,newpassword)=>async(dispatch)=>{
            try {
                dispatch({
                    type:"UpdatePasswordRequest",
                })
            
                const {data}= await axios.put("/api/v1/update_password",{oldpassword,newpassword},{headers:{
                    "Content-Type":'application/json',
                }})
                dispatch({
                    type:"UpdatePasswordSuccess",
                    payload:data.message,
                })
                
            } catch (error) {
                dispatch({
                    type:"UpdatePasswordFailure",
                    payload:error.response.data.message,
                })
            }
        }

        export const DeleteProfile= ()=>async(dispatch)=>{
            try {
                dispatch({
                    type:"DeleteprofileRequest",
                })
            
                const {data}= await axios.delete("/api/v1/delete_profile")
                dispatch({
                    type:"DeleteprofileSuccess",
                    payload:data.message,
                })
                
            } catch (error) {
                dispatch({
                    type:"DeleteprofileFailure",
                    payload:error.response.data.message,
                })
            }
        }

        export const ForgotPassword= (email)=>async(dispatch)=>{
            try {
                dispatch({
                    type:"ForgotPasswordRequest",
                })
            
                const {data}= await axios.post("/api/v1/forgot_password",{email},{headers:{
                    "Content-Type": "application/json"
                }})
                dispatch({
                    type:"ForgotPasswordSuccess",
                    payload:data.message,
                })
                
            } catch (error) {
                dispatch({
                    type:"ForgotPasswordFailure",
                    payload:error.response.data.message,
                })
            }
        }


        export const ResetPassword= (token,password)=>async(dispatch)=>{
            try {
                dispatch({
                    type:"ResetPasswordRequest",
                })
            
                const {data}= await axios.put(`/api/v1/password/reset/${token}`,{password},{headers:{
                    "Content-Type": "application/json"
                }})
                dispatch({
                    type:"ResetPasswordSuccess",
                    payload:data.message,
                })
                
            } catch (error) {
                dispatch({
                    type:"ResetPasswordFailure",
                    payload:error.response.data.message,
                })
            }
        }

        export const GetUserposts=(id)=>async(dispatch)=>{
            try {
            
            
                dispatch({
                    type:"UserpostRequest",
            
                })
            
                const {data}= await axios.get(`/api/v1/userpost/${id}`)
            
                dispatch({
                    type:"UserpostSuccess",
                    payload:data.posts,
                })
            
                
            } catch (error) {
                dispatch({
                    type:"UserpostFaliure",
                    payload:error.response.data.message,
                })
            }
            }

            export const GetUserprofile=(id)=>async(dispatch)=>{
                try {
                
                
                    dispatch({
                        type:"UserprofileRequest",
                
                    })
                
                    const {data}= await axios.get(`/api/v1/users/${id}`)
                
                    dispatch({
                        type:"UserprofileSuccess",
                        payload:data.userdata,
                    })
                
                    
                } catch (error) {
                    dispatch({
                        type:"UserprofileFaliure",
                        payload:error.response.data.message,
                    })
                }
                }

                export const Followuser=(id)=>async(dispatch)=>{
                    try {
                             dispatch({
                            type:"FollowuserRequest",
                    
                        })
                    
                        const {data}= await axios.get(`/api/v1/follow/${id}`)
                    
                        dispatch({
                            type:"FollowuserSuccess",
                            payload:data.message,
                        })
                    
                        
                    } catch (error) {
                        dispatch({
                            type:"FollowuserFaliure",
                            payload:error.response.data.message,
                        })
                    }
                    }