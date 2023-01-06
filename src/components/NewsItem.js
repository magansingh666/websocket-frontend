import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function NewsItem({id, title, subtitle, description}) {
  return (
    <Box component="span" sx={{ p: 2, border: '5px dashed black', width : "200px", m : "10px" }}>
       <h1>{id}</h1>
       <h1>{title}</h1>
       <h3>{subtitle}</h3>
       <p>{description}</p>
    </Box>
  );
}
