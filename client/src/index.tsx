import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
}) as any;

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
