import { createReducer } from "@reduxjs/toolkit";

const Loginrequest = 'Loginrequest';
const Loginsuccess = 'Loginsuccess';
const Loginfailure = 'Loginfailure';
const RegisterRequest = 'RegisterRequest';
const Registersuccess = 'Registersuccess';
const Registerfailure = 'Registerfailure';
const Loaduserrequest = 'Loaduserrequest';
const Loadusersuccess = 'Loadusersuccess';
const loaduserfailure = 'loaduserfailure';
const Logoutuserrequest = 'Logoutuserrequest';
const Logoutusersuccess = 'Logoutusersuccess';
const Logoutuserfailure = 'Logoutuserfailure';
const postoffollowingRequest = 'postoffollowingRequest';
const postoffollowingSuccess = 'postoffollowingSuccess';
const postoffollowingFailure = 'postoffollowingFailure';
const AlluserRequest = 'AlluserRequest';
const AlluserSuccess = 'AlluserSuccess';
const AlluserFailure = 'AlluserFailure';
const UserprofileRequest = 'UserprofileRequest';
const UserprofileSuccess = 'UserprofileSuccess';
const UserprofileFailure = 'UserprofileFailure';
const ClearError="ClearError";


const initialState = {
  isAuthenticated:false,
};


//USER LOGIN REDUCER
export const userReducer = createReducer(initialState, (builder) => {
  // login user
  builder
    .addCase(Loginrequest, (state) => {
      state.loading = true;
    })
    .addCase(Loginsuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(Loginfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });

  // register user
  builder
    .addCase(RegisterRequest, (state) => {
      state.loading = true;
    })
    .addCase(Registersuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(Registerfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });

  // load user
  builder
    .addCase(Loaduserrequest, (state) => {
      state.loading = true;
    })
    .addCase(Loadusersuccess, (state, action) => {
      state.loading = false;
      state.userdata = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(loaduserfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });
    
//USER LOGOUT
    builder
    .addCase(Logoutuserrequest, (state) => {
      state.loading = true;
    })
    .addCase(Logoutusersuccess, (state) => {
      state.loading = false;
      state.userdata = null;
      state.isAuthenticated=false;
    })
    .addCase(Logoutuserfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(
      ClearError, (state)=>{
        state.error=null;
  
      }
    )
});

//FOLLOWING POST REDUCER
export const PostOfFollowingpostreducer= createReducer(initialState,(builder)=>{
  builder.addCase(
    postoffollowingRequest, (state)=>{
      state.loading=true;
    }
  )
  builder.addCase(
    postoffollowingSuccess, (state,action)=>{
      state.loading=false;
      state.postnew=action.payload;
      state.isAuthenticated=true;
    }
  )
  builder.addCase(
    postoffollowingFailure, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.isAuthenticated=false;

    }
  )
  builder.addCase(
    ClearError, (state)=>{
      state.error=null;

    }
  )
}) 

// Get All User Reducer
export const Alluserreducer= createReducer(initialState,(builder)=>{
  builder.addCase(
    AlluserRequest, (state)=>{
      state.loading=true;
    }
  )
  builder.addCase(
    AlluserSuccess, (state,action)=>{
      state.loading=false;
      state.userdata=action.payload;
      state.isAuthenticated=true;
    }
  )
  builder.addCase(
    AlluserFailure, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.isAuthenticated=false;

    }
  )
  builder.addCase(
    ClearError, (state)=>{
      state.error=null;

    }
  )
}) 

export const Userprofilereducer= createReducer(initialState,(builder)=>{
  builder.addCase(
    UserprofileRequest, (state)=>{
      state.loading=true;
    }
  )
  builder.addCase(
    UserprofileSuccess, (state,action)=>{
      state.loading=false;
      state.userdata=action.payload;
      state.isAuthenticated=true;
    }
  )
  builder.addCase(
    UserprofileFailure, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.isAuthenticated=false;

    }
  )
  builder.addCase(
    ClearError, (state)=>{
      state.error=null;

    }
  )
})