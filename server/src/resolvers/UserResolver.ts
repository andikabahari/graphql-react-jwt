import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { MyContext } from "../MyContext";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hi!";
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const salt = 12;
    const hashedPassword = await hash(password, salt);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Could not find user");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Password is incorrect");
    }

    const userId = { userId: user.id };
    const secret = "mylittlesecret";
    const expiresIn = { expiresIn: "3d" };
    const accessToken = sign(userId, secret, expiresIn);
    const httpOnly = { httpOnly: true };
    res.cookie("jid", accessToken, httpOnly);

    return { accessToken };
  }
}
