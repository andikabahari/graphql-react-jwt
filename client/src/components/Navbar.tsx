import React from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Navbar: React.FC = () => {
  const { data } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

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
            <button
              onClick={async () => {
                await logout();
                setAccessToken("");
                await client.resetStore();
              }}
            >
              Logout
            </button>
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
