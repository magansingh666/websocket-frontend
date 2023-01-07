import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function NewsItem({id, title, subtitle, description, setEditItemId}) {
  const navigate = useNavigate();
  return (
    <Box component="span" sx={{ p: 2, border: '5px dashed black', width : "200px", m : "10px" }}>
       <h1>{id}</h1>
       <h1>{title}</h1>
       <h3>{subtitle}</h3>
       <p>{description}</p>
       <Button variant="outlined" onClick={() => {
        setEditItemId(id)

       }}>Edit</Button>
       <Button variant="outlined" onClick={() => {
        navigate("/detail", {state:{ id, title, subtitle, description }});

       }}>View Detail</Button>
    </Box>
  );
}
