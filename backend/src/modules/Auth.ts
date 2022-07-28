import { ITokenData } from "IToken";
import * as jwt from "jsonwebtoken";

export class AuthService {
  public createToken(zid: string): ITokenData {
    const expiresIn = "12h";
    const secret = process.env.JWT_SECRET ?? "randomsecret";
    const tokenData = {
      zid,
    };
    return {
      expiresIn,
      token: "Bearer " + jwt.sign(tokenData, secret, { expiresIn }),
    };
  }
}
