import './App.css';
import socketIO from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login'






function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="signup" element={ <Signup /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
      
    </div>
  );
}

export default App;
