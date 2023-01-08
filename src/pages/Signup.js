import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import socketIO from "socket.io-client";

// For signing up new users
export default function Signup({ setLoginVisible, setSignupVisible }) {
  const socket = socketIO.connect(process.env.REACT_APP_URL);

  // States for registration
  const [name, setName] = useState("Dummy User 001");
  const [email, setEmail] = useState("dummyuser001@gmail.com");
  const [password, setPassword] = useState("1A@strongpassword001");

  // States for checking the errors

  useEffect(() => {
    return () => {
      socket.off("signup");
      socket.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
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
    socket.emit("signup", { name, email, password }, (response) => {
      if (response.message === "success") {
        alert("sign up successful! please login now");
        setSignupVisible(false);
        setLoginVisible(true);
      } else {
        alert("There is some error . Please retry");
      }
    });
  };
  return (
    <Box
      sx={{ maxWidth: "400px", backgroundColor: "white", margin: "50px auto" }}
    >
      <Stack spacing={5}>
        <h1>Register Here...</h1>
        <TextField
          label="name"
          variant="outlined"
          value={name}
          onChange={handleName}
        />
        <TextField
          label="email"
          variant="outlined"
          value={email}
          onChange={handleEmail}
        />
        <TextField
          label="password"
          variant="outlined"
          type={"password"}
          value={password}
          onChange={handlePassword}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            sx={{ maxWidth: "200px" }}
            variant="outlined"
            onClick={handleSubmit}
          >
            SIGN UP
          </Button>
        </div>
      </Stack>
    </Box>
  );
}
