import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hello from "./pages/Hello";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Me from "./pages/Me";
import Register from "./pages/Register";

const Switch: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Switch;
