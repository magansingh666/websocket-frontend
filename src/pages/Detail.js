import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import CommentDisplay from '../components/CommentDisplay';
import socketIO from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addToken, deleteToken, addNews } from "../redux/dataSlice";




function Detail() {

    const token = useSelector((state) => state.data.token);
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.user)
    const cred = { auth: { token: token } };
    const socket = socketIO.connect("http://localhost:5000", cred);


  const location = useLocation();
  const {id, title, subtitle, description } = location.state
  const [ctext, setCText] = useState("dummy comment text")
  const [comments , setComments] = useState([])




  useEffect(() => {
    //console.log("user stored in store is ....")
   // console.log(user)

    socket.emit("getcomments", {news_id : id}, (response) => {
      //console.log(response); // "got it"
      setComments(response)
      //setNews(response)
      //dispatch(addNews(response))
    });

  },[]);



  //post new comment here ....
  const handleSubmit = () => {
    console.log("submitting comment ........")

    socket.emit("addnewcomment", {ctext, uid : user.id, name : user.name, news_id : id}, (response) => {
        console.log(response); //
        setComments(response)
        
        //setNews(response)
        //dispatch(addNews(response))
      });

  }


  return (
    <>
      <h1>This is Detial Page</h1>
      <div>{JSON.stringify(location.state)}</div>
      <Box sx={{ p: 2, width : "200px", m : "10px" }}>
       <h1>{id}</h1>
       <h1>{title}</h1>
       <h3>{subtitle}</h3>
       <p>{description}</p>       
    </Box>
       <p>Add your Comment here ....</p>
       <TextField  label="title" variant="outlined" value={ctext} onChange={(e) => {setCText(e.target.value)}} />
       <Button sx={{maxWidth: "200px", }} variant="outlined" onClick={handleSubmit}>POST COMMENT</Button>
       <p>Displaying previous comment </p>
       {comments.map( (e,index) => <CommentDisplay ctext={e.ctext} /> )}

    </>
  )
}

export default Detail
