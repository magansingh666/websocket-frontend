import { useState , useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { margin } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'
import {addToken, deleteToken } from '../redux/dataSlice'


export default function Login({socket, setLoginVisible, setSignupVisible}) {

 
const [email, setEmail] = useState('dummyuser001@gmail.com');
const [password, setPassword] = useState('1A@strongpassword001');

const token = useSelector((state) =>  state.data.token)
const dispatch = useDispatch() 

// States for checking the errors
const [error, setError] = useState(false);


useEffect(()=> {
  socket.on('loginResponse', (data) => {
    console.log(data)
    if(data.message === "success"){
      dispatch(addToken(data.token))
      alert("login successful!")
      setLoginVisible(false)
    
    }
    else {alert("There is some error . Please retry")}  
  } );  
} , []);




const handleEmail = (e) => {
	setEmail(e.target.value);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();	

  console.log("handle Submit clicked ")
  console.log(email, password)
  socket.emit("login", { email, password})
};
return (
    <Box sx={{maxWidth: "400px", backgroundColor: "white", margin: "50px auto"}}>
      <Stack spacing={5}>
      <h1>Login ...</h1>
      
      <TextField  label="email" variant="outlined" value={email} onChange={handleEmail} />
      <TextField  label="password" variant="outlined" type={"password"} value={password} onChange={handlePassword}/>
      <div style={{textAlign : "center"}}>
      <Button sx={{maxWidth: "200px", }} variant="outlined" onClick={handleSubmit}>LOG IN</Button>
      <h1>{token}</h1>
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

*/