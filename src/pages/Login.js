import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToken, setUser } from "../redux/dataSlice";

import socketIO from "socket.io-client";

export default function Login({ setLoginVisible, setSignupVisible }) {
  const [email, setEmail] = useState("dummyuser001@gmail.com");
  const [password, setPassword] = useState("1A@strongpassword001");

  const dispatch = useDispatch();

  // States for checking the errors
  const socket = socketIO.connect(process.env.REACT_APP_URL);

  useEffect(() => {
    console.log("value of vari is  ");
    console.log(process.env.REACT_APP_URL);

    return () => {
      socket.off("login");
      socket.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    socket.emit("login", { email, password }, (response) => {
      if (response.message === "success") {
        dispatch(addToken(response.token));
        const { id, name, email } = response;
        dispatch(setUser({ id, name, email }));
        alert("login successful!");
        setLoginVisible(false);
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
        <h1>Login ...</h1>

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
            LOG IN
          </Button>
        </div>
      </Stack>
    </Box>
  );
}
