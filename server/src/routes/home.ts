import { Request, Response } from "express";

const home = (_: Request, res: Response) => {
  res.send("It works!");
};

export default home;
