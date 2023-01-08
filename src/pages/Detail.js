import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import CommentDisplay from '../components/CommentDisplay';
import socketIO from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addToken, deleteToken, addNews } from "../redux/dataSlice";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

function Detail() {

    const token = useSelector((state) => state.data.token);
    const user = useSelector(state => state.data.user)
    const cred = { auth: { token: token } };
    const socket = socketIO.connect("http://localhost:5000", cred);


  const location = useLocation();
  const {id, title, subtitle, description, name } = location.state
  const [ctext, setCText] = useState("")
  const [comments , setComments] = useState([null,])


  useEffect(() => {
    socket.emit("getcomments", {news_id : id}, (response) => {      
      setComments(response)       
    });    
    socket.on('commentupdate', (data) => setComments(data) );

  },[]);



  //post new comment here ....
  const handleSubmit = () => {  

    socket.emit("addnewcomment", {ctext, uid : user.id, name : user.name, news_id : id}, (response) => {    
        setComments(response)
        setCText("")      

      });

  }

  return (
    <Container maxWidth="sm">
      <p style={{"textAlign": "right"}}>USER ID : {user.id}</p>
      <Box sx={{ "border" : "1px solid black", mt : 1 , p : 2}}>       
       <h1 style={{"textAlign" : "center"}}>{title}</h1>
       <p style={{"textAlign" : "right"}}>written by {name}</p>
       <h3>{subtitle}</h3>
       <p>ID - {id}</p>
       
       <p>{description}</p>       
    </Box>
       <h3>Add your Comment here ....</h3>
       <Stack spacing={2}>
       <TextField  label="comment text" variant="outlined" value={ctext} onChange={(e) => {setCText(e.target.value)}} />
       <div style={{textAlign : "right"  }}>
       <Button sx={{maxWidth: "200px", }} variant="outlined" onClick={handleSubmit}>POST</Button>
       </div>
       

        
      </Stack>

       
       <h3>Displaying previous comment </h3>
       {Array.isArray(comments) && comments.map( (e, index) => e ? <CommentDisplay key= {index} ctext={e.ctext} c_author_name = {e.name} /> : <p key={index}></p> )}

    </Container>
  )
}

export default Detail
