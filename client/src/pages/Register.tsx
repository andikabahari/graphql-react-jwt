import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  return (
    <div>
      <h3>Register page</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const response = await register({
            variables: {
              email,
              password,
            },
          });

          if (response.data?.register) {
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
