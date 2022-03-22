import { sign } from "jsonwebtoken";
import { User } from "./entity/User";
import { Response } from "express";

export const createAccessToken = (user: User) => {
  const payload = { userId: user.id };
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME };
  return sign(payload, secret, options);
};

export const createRefreshToken = (user: User) => {
  const payload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME };
  return sign(payload, secret, options);
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh-token",
  });
};
