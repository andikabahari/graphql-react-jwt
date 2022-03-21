import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <div>
      <h3>Login page</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const response = await login({
            variables: {
              email,
              password,
            },
          });

          if (response.data?.login.accessToken) {
            navigate("/");
          }
        }}
      >
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
