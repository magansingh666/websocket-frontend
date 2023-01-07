import React from "react";
import { Link } from "react-router-dom";
import socketIO from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToken, deleteToken, addNews } from "../redux/dataSlice";
import Signup from "./Signup";
import Login from "./Login";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NewsItem from "../components/NewsItem";
import NewsForm from "../components/NewsForm";


function Allnews() {
  const token = useSelector((state) => state.data.token);
  const dispatch = useDispatch();
  const user = useSelector(state => state.data.user)
  const cred = { auth: { token: token } };
  const socket = socketIO.connect("http://localhost:5000", cred);
  const [news , setNews] = useState([])
  const [addVisible, setAddVisible] = useState(false)
  const [editItemId, setEditItemId] = useState(0)
  const news1 = useSelector((state) =>  {console.log(state.data.news);console.log("this is news data ") ;
  return state.data.news})
  


  useEffect(() => {
    console.log("this is user .....")
    console.log(user)
    socket.on('updatenews', (response) => dispatch(addNews(response)) );     
    socket.emit("todaynews", "Get today news ...", (response) => {
      //console.log(response); // "got it"
      //setNews(response)
      dispatch(addNews(response))
    });

  },[]);

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "gray" }}>
      <h1>Today's News </h1>
      <h1>{editItemId}</h1>
      <Button variant="contained" onClick={() => {
        setAddVisible(true)
       }}>ADD NEW</Button>

       {editItemId > 0 && <NewsForm socket={socket} setAddVisible = {setAddVisible} setEditItemId = {setEditItemId} id = {editItemId}/> }
      
      {addVisible && editItemId === 0 &&  <NewsForm socket={socket} setAddVisible = {setAddVisible} setEditItemId = {setEditItemId}/>}
      {!addVisible && editItemId === 0 && <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Array.isArray(news1) && news1.map((e, index) => <NewsItem key={index} id={e.id} title={e.title} subtitle = {e.subtitle} description ={e.description} setEditItemId = {setEditItemId} name = {e.name} author_id = {e.uid} uid = {user.id} />)}     
      </Box> }
      
    </Container>
  );
}

export default Allnews;






/*


      <button onClick={() => {


       socket.emit("message", "hello world", (response) => {
        console.log(response); // "got it"
      });
        
        }}> emit messsage </button>


*/
