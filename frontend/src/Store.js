import {configureStore} from "@reduxjs/toolkit";
import { PostOfFollowingpostreducer, userReducer,Alluserreducer, Userprofilereducer } from "./Reducers/User";
import { LikeanddislikeReducer, MyspostReducer, UserpostReducer } from "./Reducers/Post";

const store = configureStore({
    reducer:{ 
        user:userReducer,
        postoffolllowing:PostOfFollowingpostreducer,
        Alluser:Alluserreducer,
        Likepost: LikeanddislikeReducer,
        Mypost:MyspostReducer,
        Userprofile: Userprofilereducer,
        Userpost: UserpostReducer,
     }
})

export default store;