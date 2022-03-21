import React from "react";
import { useUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Home page</h3>
      <div>Users:</div>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              {user.id}, {user.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
