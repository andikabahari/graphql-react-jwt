import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./pages/Hello";

const Switch: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Switch;
