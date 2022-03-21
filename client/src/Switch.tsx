import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Hello from "./pages/Hello";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Switch: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Switch;
