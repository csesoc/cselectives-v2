import { unauthorizedError } from "../../utils/Constants";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { IToken } from "IToken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET as string;
  const tokenArray = req.headers["authorization"]?.split(" ");

  if (!tokenArray || tokenArray[0] !== "Bearer" || tokenArray.length !== 2) {
    return res
      .status(unauthorizedError.errorCode)
      .json({ message: "A bearer token is required for authentication" });
  }

  try {
    jwt.verify(tokenArray[1], secret) as IToken;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(unauthorizedError.errorCode)
        .json({ message: "Expired token" });
    }
    return res
      .status(unauthorizedError.errorCode)
      .json({ message: "Invalid Token" });
  }
  return next();
};

export default verifyToken;
