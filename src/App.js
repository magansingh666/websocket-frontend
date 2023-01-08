import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Detail from "./pages/Detail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;

//firebase hosting --> target_name ## post siteID ##  post1
