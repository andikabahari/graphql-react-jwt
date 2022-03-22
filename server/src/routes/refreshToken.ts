import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "../auth";
import { User } from "../entity/User";

const refreshToken = async (req: Request, res: Response) => {
  const { jid: token } = req.cookies;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await User.findOne({ id: payload.userId });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({
    ok: true,
    accessToken: createAccessToken(user),
  });
};

export default refreshToken;
