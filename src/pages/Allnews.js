import React from 'react'
import {Link} from 'react-router-dom'
import socketIO from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {addToken, deleteToken } from '../redux/dataSlice'
import Signup from './Signup';
import Login from './Login';
import Button from '@mui/material/Button';




function Allnews() {
const token = useSelector((state) =>  state.data.token)
const dispatch = useDispatch()
const cred = { auth: {"token" : token } }
const socket = socketIO.connect('http://localhost:5000', cred);

  return (
    <div>
      <h1>all news component </h1>
      <button onClick={() => {
       socket.emit("message", "hello world", (response) => {
        console.log(response); // "got it"
      });
        
        }}> emit messsage </button>
    </div>
  )
}

export default Allnews
