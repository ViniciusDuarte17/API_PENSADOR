import * as jwt from "jsonwebtoken";
import { authenticationData } from "../types/authenticationData";
import dotenv from "dotenv";
dotenv.config();
export class Authenticator {
  generationToken = (payload: authenticationData) => {
    return jwt.sign(payload, process.env.JWT as string, {
      expiresIn: "5h"
    });
  };
  getTokenData = (token: string) => {
    try {
      const tokenData = jwt.verify(
        token,
        process.env.JWT as string
      ) as authenticationData;
      return tokenData;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}