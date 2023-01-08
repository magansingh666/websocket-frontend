import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// for displaying comment
function CommentDisplay({ ctext = "dummy text", c_author_name = "" }) {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "8px",
        border: "1px solid black",
        mt: 1,
        mb: 1,
        p: 1,
      }}
    >
      <Stack>
        <p>{ctext}</p>
        <p style={{ textAlign: "right" }}> by - {c_author_name}</p>
      </Stack>
    </Box>
  );
}

export default CommentDisplay;
