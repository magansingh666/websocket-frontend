import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

//To display each individual news item
export default function NewsItem({
  id,
  title,
  subtitle,
  description,
  setEditItemId,
  author_id = undefined,
  name = undefined,
  uid = undefined,
}) {
  const navigate = useNavigate();

  return (
    <Box
      component="span"
      sx={{ p: 2, border: "1px dashed gray", width: "200px", m: "10px" }}
    >
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <p>{description}</p>
      <p>{id}</p>
      <p>{name}</p>

      <Button
        variant="outlined"
        onClick={() => {
          navigate("/detail", {
            state: { id, title, subtitle, description, name },
          });
        }}
      >
        View Detail
      </Button>

      <p></p>

      {author_id === uid ? (
        <Button
          variant="outlined"
          onClick={() => {
            setEditItemId(id);
          }}
        >
          Edit
        </Button>
      ) : null}
    </Box>
  );
}
