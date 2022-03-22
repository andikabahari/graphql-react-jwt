import React from "react";
import { useMeQuery } from "../generated/graphql";

const Me: React.FC = () => {
  const { data, loading, error } = useMeQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <h3>Me page</h3>
      <div>{data?.me?.email}</div>
    </div>
  );
};

export default Me;
