import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./auth";

const main = async () => {
  await createConnection();

  const app = express();
  const port = 5000;

  app.use(cookieParser());

  app.get("/", (_, res) => res.send("It works!"));

  app.post("/refresh-token", async (req, res) => {
    const { jid: token } = req.cookies;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload;
    try {
      payload = verify(
        token,
        process.env.REFRESH_TOKEN_EXPIRATION_TIME!
      ) as any;
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
    });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "https://studio.apollographql.com",
      credentials: true,
    },
  });

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main();
