import React from 'react'
import { useState , useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { margin } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'
import {addNews } from '../redux/dataSlice'

function AddCommentForm() {
  return (
    <Box sx={{maxWidth: "400px", backgroundColor: "white", margin: "50px auto"}}>
      <Stack spacing={5}>
      <h1>Register Here...</h1>
      <TextField  label="title" variant="outlined" value={title} onChange={handleTitle} /> 
      <div style={{textAlign : "center"}}>
      <Button sx={{maxWidth: "200px", }} variant="outlined" onClick={handleSubmit}>Submit News Item</Button>
      </div>      
      </Stack>      
    </Box>	
  )
}

export default AddCommentForm
