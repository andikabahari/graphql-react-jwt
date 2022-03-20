import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();

  const app = express();
  const port = 5000;

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "https://studio.apollographql.com",
      credentials: true,
    },
  });

  app.get("/", (_, res) => res.send("It works!"));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main();
