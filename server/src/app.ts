import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import router from "./router";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/", router);

export default app;
