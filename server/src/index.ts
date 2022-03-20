import "reflect-metadata";
import express from "express";

const main = async () => {
  const app = express();
  const port = 5000;

  app.get("/", (_, res) => res.send("It works!"));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main();
