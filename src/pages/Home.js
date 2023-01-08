import React from 'react'
import {Link} from 'react-router-dom'
import socketIO from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {addToken } from '../redux/dataSlice'
import Signup from './Signup';
import Login from './Login';
import Button from '@mui/material/Button';
import Allnews from './Allnews';






const socket = socketIO.connect('http://localhost:5000');
  


function Home() {
   
    const [signupVisible, setSignupVisible] = useState(false)
    const token = useSelector((state) =>  state.data.token)
    const dispatch = useDispatch() 
    const flag = token ? false : true
    const [loginVisible, setLoginVisible] = useState(flag)

    useEffect(()=> {
      socket.on('signupResponse', (data) => console.log(data) );
      socket.on('loginResponse', (data) => console.log(data) ); 
      
      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };

    } , []);
  
  return (
    <div>
      {signupVisible && 
      <Signup socket={socket} setLoginVisible = {setLoginVisible} setSignupVisible = {setSignupVisible} />}
      {signupVisible && <Button sx={{maxWidth: "200px"}} variant="text" onClick={() => {setLoginVisible(true); 
        setSignupVisible(false)}}>Login...</Button>}
      {loginVisible && 
      <Login socket={socket} setLoginVisible = {setLoginVisible} setSignupVisible = {setSignupVisible} />}
      {loginVisible &&  
      <Button sx={{maxWidth: "200px", }} variant="text" onClick={() => {setLoginVisible(false); 
        setSignupVisible(true)}}>Sign up...</Button>
      }
      
      {!signupVisible && !loginVisible &&  <Allnews />}
      
      
      
      
     
    

    </div>
  )
}

export default Home


/*


    fetch('http://localhost:5000/api')
    .then((response) => response.json())
    .then((data) => console.log(data));



    //socket.auth = {token : token}
//console.log(socket)

{message: 'success', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib…zk4fQ.-aXmlDOTxs4Es3YV37k7nKnhayIucVB5WnSUjxwGtr0'}



message
: 
"success"
token
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkR1bW15IFVzZXIgMDAxIiwiZW1haWwiOiJkdW1teXVzZXIwMDFAZ21haWwuY29tIiwiaWF0IjoxNjcyOTcxMzMwfQ.-945018opi4W5I3ep6jgFXX__hFyrOEiW1Vq7fu49dg"
[[Prototype]]
: 
Object




const signupdata3 = {
    "name": "Dummy User 003",
    "email": "dummyuser003@gmail.com",
    "password": "1A@strongpassword003"
  }

  const signupdata2 = {
    "name": "Dummy User 002",
    "email": "dummyuser002@gmail.com",
    "password": "1A@strongpassword002"
  }

  const signupdata1 = {
    "name": "Dummy User 001",
    "email": "dummyuser001@gmail.com",
    "password": "1A@strongpassword001"
  }

  const logindata1 = {    
    "email": "dummyuser001@gmail.com",
    "password": "1A@strongpassword001"
  }



*/