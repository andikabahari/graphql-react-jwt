import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Switch from "./Switch";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
}) as any;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Switch />
    </ApolloProvider>
  );
};

export default App;
