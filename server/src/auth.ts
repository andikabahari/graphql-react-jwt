import { sign } from "jsonwebtoken";
import { User } from "./entity/User";
import { Response } from "express";

export const createAccessToken = (user: User) => {
  const userId = { userId: user.id };
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const expiresIn = { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME };
  return sign(userId, secret, expiresIn);
};

export const createRefreshToken = (user: User) => {
  const userId = { userId: user.id };
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  const expiresIn = { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME };
  return sign(userId, secret, expiresIn);
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, { httpOnly: true });
};
