import { useState , useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { margin } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'
import {addNews } from '../redux/dataSlice'


export default function NewsForm({socket}) {

// States for registration
const [title, setTitle] = useState('title00001');
const [subtitle, setSubtitle] = useState('subtitle0001');
const [description, setDescription] = useState('description000001');
const dispatch = useDispatch();

// States for checking the errors
const [error, setError] = useState(false);






// Handling the name change
const handleTitle = (e) => {
	setTitle(e.target.value);
	
};

// Handling the email change
const handleSubtitle = (e) => {
	setSubtitle(e.target.value);
};

// Handling the password change
const handleDescription = (e) => {
	setDescription(e.target.value);
};

// Handling the form submission
const handleSubmit = async (e) => {
  e.preventDefault();	
  console.log("handle Submit clicked ")
  console.log(title, subtitle, description)
  socket.emit("newnewsitem", {title, subtitle, description},  (response) => {
  console.log(response)
  dispatch(addNews(response))

  } )
};
return (
    <Box sx={{maxWidth: "400px", backgroundColor: "white", margin: "50px auto"}}>
      <Stack spacing={5}>
      <h1>Register Here...</h1>
      <TextField  label="title" variant="outlined" value={title} onChange={handleTitle} />
      <TextField  label="subtitle" variant="outlined" value={subtitle} onChange={handleSubtitle} />
      <TextField  label="description" variant="outlined" value={description} onChange={handleDescription}/>
      <div style={{textAlign : "center"}}>
      <Button sx={{maxWidth: "200px", }} variant="outlined" onClick={handleSubmit}>Submit News Item</Button>
      </div>      
      </Stack>      
    </Box>	
);
}





/*
 const signupdata1 = {
    "name": "Dummy User 001",
    "email": "dummyuser001@gmail.com",
    "password": "1A@strongpassword001"
  }


useEffect(()=> {
  socket.on('signupResponse', (data) => {
    console.log(data)
    if(data.message === "success"){
      alert("sign up successful! please login now")    
    }
    else {alert("There is some error . Please retry")}  
  } );
  socket.on('loginResponse', (data) => console.log(data) );   
} , []);






*/