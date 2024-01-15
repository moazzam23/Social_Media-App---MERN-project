import './App.css';
import { useEffect } from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Acounts/Account';
import Newpost from './Components/Newpost/Newpost';
import Resetpassword from "./Components/ResetPassword/Resetpassword"
import Register from './Components/Register/Register';
import Updatepassword from './Components/Updatepassword/Updatepassword';
import Updateprofile from './Components/Updateprofile/Updateprofile';
import Forgotpassword from './Components/Forgotpassword/Forgotpassword';
import Userprofile from './Components/Userprofile/Userprofile';
import Search from './Components/Search/Search';
import Notfound from "./Components/NotFound/Notfound";


function App() {

  const{isAuthenticated}= useSelector((state)=>state.user)

  const dispatch= useDispatch();

  useEffect(() => {
   dispatch(LoadUser());
  }, [dispatch])
  

  return (
    <>
    <Router>
{ isAuthenticated &&      <Header/>}
      <Routes>
        <Route path='/' element={ isAuthenticated ? <Home/> : <Login/>} />
        <Route path='/account' element={ isAuthenticated ? <Account/> : <Login/>} />
        <Route path='/register' element={ isAuthenticated ? <Account/> : <Register/>} />
        <Route path='/update/profile' element={ isAuthenticated ? <Updateprofile/> : <Login/>} />
        <Route path='/update/password' element={ isAuthenticated ? <Updatepassword/> : <Login/>} />
        <Route path='/newpost' element={ isAuthenticated ? <Newpost/> : <Login/>} />
        <Route path='/password/reset/:token' element={ isAuthenticated ? <Forgotpassword/> : <Resetpassword/>} />
        <Route path='/user/:id' element={ isAuthenticated ? <Userprofile/> : <Login/>} />
        <Route path='/search' element={ isAuthenticated ? <Search/> : <Login/>} />
        <Route path='/forgot/password' element={  <Updatepassword/>} />
        <Route path='*' element={  <Notfound/>} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
