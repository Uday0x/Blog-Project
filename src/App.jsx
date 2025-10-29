import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';
import {login,logout} from "./store/authSlice.js"
import authservice from './appwrite/auth.js';
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';

const App = () => {


  const [loading,setloading] =useState(true)

  useEffect(()=>{
      authservice.getCurrentUser()
        .then((userData)=>{  //u can use superman in place of userData
          if(userData){
            dispatch(login(userData))
          } else{
            dispatch(logout())
          }
        })
        .finally(()=>setloading(false))
  },[])


  return !loading ? (
    <>
      <Header/>
      <main>
        <Outlet/>  //ToDo
      </main>
      <Footer/>
   </>
  ) : (
    null
  )
  
}

export default App
