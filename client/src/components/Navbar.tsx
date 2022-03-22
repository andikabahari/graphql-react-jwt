import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
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
      <div>
        <Link to="/me">Me</Link>
      </div>
    </header>
  );
};

export default Navbar;
