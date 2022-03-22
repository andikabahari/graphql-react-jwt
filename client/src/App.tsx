import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import Switch from "./Switch";
import { setAccessToken } from "./accessToken";
import apolloClient from "./apolloClient";

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
    <ApolloProvider client={apolloClient}>
      <Switch />
    </ApolloProvider>
  );
};

export default App;
