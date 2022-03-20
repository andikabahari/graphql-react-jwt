import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
  const userId = { userId: user.id };
  const secret = "mylittlesecret1";
  const expiresIn = { expiresIn: "15m" };
  return sign(userId, secret, expiresIn);
};

export const createRefreshToken = (user: User) => {
  const userId = { userId: user.id };
  const secret = "mylittlesecret2";
  const expiresIn = { expiresIn: "7d" };
  return sign(userId, secret, expiresIn);
};
