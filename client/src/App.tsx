import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Switch from "./Switch";
import { getAccessToken } from "./accessToken";

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
  return (
    <ApolloProvider client={client}>
      <Switch />
    </ApolloProvider>
  );
};

export default App;
