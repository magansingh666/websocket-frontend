import React from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import Button from "@mui/material/Button";
import Allnews from "./Allnews";
import { Container } from "@mui/material";

// This component displays Signup , Login or Allnews component according to appropriate value of
// signupVisible,  loginVisible variables

function Home() {
  const [signupVisible, setSignupVisible] = useState(false);
  const token = useSelector((state) => state.data.token);
  const flag = token ? false : true;
  const [loginVisible, setLoginVisible] = useState(flag);

  return (
    <Container maxWidth="md">
      {signupVisible && (
        <Signup
          setLoginVisible={setLoginVisible}
          setSignupVisible={setSignupVisible}
        />
      )}
      {signupVisible && (
        <Button
          sx={{ maxWidth: "200px" }}
          variant="text"
          onClick={() => {
            setLoginVisible(true);
            setSignupVisible(false);
          }}
        >
          Login...
        </Button>
      )}
      {loginVisible && (
        <Login
          setLoginVisible={setLoginVisible}
          setSignupVisible={setSignupVisible}
        />
      )}
      {loginVisible && (
        <Button
          sx={{ maxWidth: "200px" }}
          variant="text"
          onClick={() => {
            setLoginVisible(false);
            setSignupVisible(true);
          }}
        >
          Sign up...
        </Button>
      )}

      {!signupVisible && !loginVisible && <Allnews />}
    </Container>
  );
}

export default Home;
