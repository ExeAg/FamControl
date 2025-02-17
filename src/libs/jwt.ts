import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export async function createAccessToken(payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err || !token) reject(err);
      resolve(token as string);
    });
  });
}
