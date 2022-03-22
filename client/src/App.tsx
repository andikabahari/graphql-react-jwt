import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Switch from "./Switch";
import { getAccessToken, setAccessToken } from "./accessToken";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
  request: (operation) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      operation.setContext({
        headers: {
          "x-auth-token": `Bearer ${accessToken}`,
        },
      });
    }
  },
}) as any;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/refresh-token", {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <Switch />
    </ApolloProvider>
  );
};

export default App;
