import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { addNews } from "../redux/dataSlice";

// Form for editing and adding New News Item
export default function NewsForm({
  socket,
  setAddVisible,
  setEditItemId = undefined,
  id = undefined,
  titleText = "",
  subTitleText = "",
  desText = "",
}) {
  // States for registration
  const [title, setTitle] = useState(titleText);
  const [subtitle, setSubtitle] = useState(subTitleText);
  const [description, setDescription] = useState(desText);
  const dispatch = useDispatch();
  const news = useSelector((state) => state.data.news);
  const user = useSelector((state) => state.data.user);

  useEffect(() => {
    if (id !== undefined) {
      const item = news.filter((e) => e.id === id).pop();

      setTitle(item.title);
      setSubtitle(item.subtitle);
      setDescription(item.description);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (setEditItemId !== undefined) {
      setEditItemId(0);
    }
    console.log("handle Submit clicked ");
    console.log(title, subtitle, description);
    if (id === undefined) {
      socket.emit(
        "newnewsitem",
        { title, subtitle, description, uid: user.id, name: user.name },
        (response) => {
          console.log(response);
          dispatch(addNews(response));
          setAddVisible(false);
        }
      );
    } else {
      socket.emit(
        "newsitemupdate",
        { id, title, subtitle, description },
        (response) => {
          console.log(response);
          dispatch(addNews(response));
          setAddVisible(false);
        }
      );
    }
  };
  return (
    <Box
      sx={{ maxWidth: "400px", backgroundColor: "white", margin: "50px auto" }}
    >
      <Stack spacing={5}>
        <h1>Add/Edit here...</h1>
        <TextField
          label="title"
          variant="outlined"
          value={title}
          onChange={handleTitle}
        />
        <TextField
          label="subtitle"
          variant="outlined"
          value={subtitle}
          onChange={handleSubtitle}
        />
        <TextField
          label="description"
          variant="outlined"
          value={description}
          onChange={handleDescription}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            sx={{ maxWidth: "200px" }}
            variant="outlined"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Stack>
    </Box>
  );
}
