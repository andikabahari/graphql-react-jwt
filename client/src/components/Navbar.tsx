import React from "react";
import { Link } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

const Navbar: React.FC = () => {
  const { data } = useMeQuery();

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      {data && data.me ? (
        <>
          <div>
            <Link to="/me">Me</Link>
          </div>
          <div>
            <Link to="/logout">Logout</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
