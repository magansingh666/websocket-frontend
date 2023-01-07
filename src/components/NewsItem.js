import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function NewsItem({id, title, subtitle, description, setEditItemId, author_id = undefined, name = undefined ,uid = undefined}) {
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log("this is value of variable ss  ----")
    console.log(id, title, author_id, uid, name)
  },[])

  return (
    <Box component="span" sx={{ p: 2, border: '5px dashed black', width : "200px", m : "10px" }}>
       <h1>{id}</h1>
       <p>{name}</p>
       <h1>{title}</h1>
       <h3>{subtitle}</h3>
       <p>{description}</p>
       {author_id === uid ? <Button variant="outlined" onClick={() => {
        setEditItemId(id)
       }}>Edit</Button> : null  }
       


       <Button variant="outlined"  onClick={() => {
        navigate("/detail", {state:{ id, title, subtitle, description, name }});

       }}>View Detail</Button>
    </Box>
  );
}



/*
sx = {{display : uid === author_id ? 'inline' : 'none'}} 


*/