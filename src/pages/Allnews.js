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
  const cred = { auth: { token: token } };
  const socket = socketIO.connect("http://localhost:5000", cred);
  const [news , setNews] = useState([])
  const news1 = useSelector((state) =>  {console.log(state.data.news);console.log("this is news data ") ;
  return state.data.news})


  useEffect(() => {

    socket.emit("todaynews", "Get today news ...", (response) => {
      console.log(response); // "got it"
      setNews(response)
      dispatch(addNews(response))
    });


  },[]);

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "gray" }}>
      <h1>all news are here </h1>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {news1.map((e, index) => <NewsItem key={index} id={e.id} title={e.title} subtitle = {e.subtitle} description ={e.description} />)}     
      </Box>
      <NewsForm socket={socket} />
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
