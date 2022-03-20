import { MyContext } from "src/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authHeader = context.req.headers["x-auth-token"] as string;
  if (!authHeader.match(/bearer .+/)) {
    throw new Error("Token undefined");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }

  return next();
};
