import React from "react";
import { useMeQuery } from "../generated/graphql";

const Me: React.FC = () => {
  const { data, loading, error } = useMeQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <div>{data?.me}</div>;
};

export default Me;
